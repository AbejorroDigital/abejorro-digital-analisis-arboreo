import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { SyntaxNode } from "../types";

interface TreeVisualizationProps {
  data: SyntaxNode[];
}

export default function TreeVisualization({ data }: TreeVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current || !containerRef.current)
      return;

    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 80, right: 60, bottom: 120, left: 60 };

    // Force light mode colors for maximum contrast and printability
    const colors = {
      line: '#d4d4d8',
      text: '#18181b',
      bg: '#ffffff',
      word: '#4f46e5',
      morph: '#71717a',
      func: '#059669',
      nodeBg: '#f4f4f5',
      nodeStroke: '#d4d4d8'
    };

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("width", "100%")
      .style("height", "100%")
      .style("font-family", "Inter, sans-serif")
      .style("background-color", "transparent");

    const g = svg.append("g");

    // Add zoom capabilities
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    let root: d3.HierarchyNode<SyntaxNode>;
    try {
      root = d3
        .stratify<SyntaxNode>()
        .id((d) => d.id)
        .parentId((d) => d.parentId)(data);
    } catch (e) {
      console.error("Error stratifying data", e);
      return;
    }

    // Use nodeSize to prevent horizontal overlap, increased spacing for wrapped text
    const nodeWidth = 160;
    const nodeHeight = 130;
    const treeLayout = d3
      .tree<SyntaxNode>()
      .nodeSize([nodeWidth, nodeHeight]);
    const treeRoot = treeLayout(root);

    // Initial transform to center the root
    const initialTransform = d3.zoomIdentity.translate(width / 2, margin.top);
    svg.call(zoom.transform, initialTransform);

    // Links
    g.append("g")
      .attr("fill", "none")
      .attr("stroke", colors.line)
      .attr("stroke-opacity", 0.8)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(treeRoot.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkVertical<
            d3.HierarchyPointLink<SyntaxNode>,
            d3.HierarchyPointNode<SyntaxNode>
          >()
          .x((d) => d.x)
          .y((d) => d.y),
      );

    // Nodes
    const node = g
      .append("g")
      .selectAll("g")
      .data(treeRoot.descendants())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    // Node background pill
    node
      .append("rect")
      .attr("fill", colors.bg)
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("x", -28)
      .attr("y", -16)
      .attr("width", 56)
      .attr("height", 32)
      .attr("stroke", colors.nodeStroke)
      .attr("stroke-width", 1.5);

    // Node Label
    node
      .append("text")
      .attr("dy", "0.32em")
      .attr("text-anchor", "middle")
      .attr("fill", colors.text)
      .style("font-size", "12px")
      .style("font-weight", "600")
      .text((d) => d.data.label);

    // Function (if any)
    node
      .filter((d) => !!d.data.function)
      .append("text")
      .attr("y", -28)
      .attr("text-anchor", "middle")
      .attr("fill", colors.func)
      .style("font-size", "11px")
      .style("font-weight", "500")
      .text((d) => d.data.function || "");

    // Word (for leaves)
    node
      .filter((d) => !d.children && !!d.data.word)
      .append("text")
      .attr("y", 36)
      .attr("text-anchor", "middle")
      .attr("fill", colors.word)
      .style("font-size", "15px")
      .style("font-weight", "700")
      .style("font-family", "Playfair Display, serif")
      .text((d) => d.data.word || "");

    // Morphology (for leaves) - Wrapped text
    const morphText = node
      .filter((d) => !d.children && !!d.data.morphology)
      .append("text")
      .attr("y", 54)
      .attr("text-anchor", "middle")
      .attr("fill", colors.morph)
      .style("font-size", "10px");

    morphText.each(function(d) {
      const el = d3.select(this);
      const words = (d.data.morphology || "").split(/\s+/);
      let line: string[] = [];
      let lineNumber = 0;
      const lineHeight = 1.2; // ems
      const maxCharsPerLine = 24;

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        line.push(word);
        const lineString = line.join(" ");
        if (lineString.length > maxCharsPerLine && line.length > 1) {
          line.pop();
          el.append("tspan")
            .attr("x", 0)
            .attr("dy", lineNumber === 0 ? 0 : `${lineHeight}em`)
            .text(line.join(" "));
          line = [word];
          lineNumber++;
        }
      }
      if (line.length > 0) {
        el.append("tspan")
          .attr("x", 0)
          .attr("dy", lineNumber === 0 ? 0 : `${lineHeight}em`)
          .text(line.join(" "));
      }
    });

  }, [data, dimensions]);

  return (
    <div
      ref={containerRef}
      id="tree-container"
      className="w-full h-[700px] overflow-hidden bg-white rounded-2xl shadow-sm border border-zinc-200 relative"
    >
      <svg
        ref={svgRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      ></svg>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <div className="text-xs text-zinc-500 bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm border border-zinc-200">
          Scroll para hacer zoom, arrastra para mover
        </div>
      </div>
    </div>
  );
}
