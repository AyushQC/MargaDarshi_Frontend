import React, { useState, useEffect } from 'react';

const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will be called only on the client side
    const renderMermaid = async () => {
      try {
        // Validate chart input
        if (!chart || typeof chart !== 'string' || chart.trim() === '') {
          setError('No chart data provided');
          return;
        }

        // Clean the chart string
        const cleanChart = chart.trim();
        
        // Basic validation for Mermaid syntax
        const validMermaidTypes = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'journey', 'gantt', 'pie', 'gitgraph'];
        const hasValidType = validMermaidTypes.some(type => cleanChart.toLowerCase().includes(type.toLowerCase()));
        
        if (!hasValidType) {
          setError('Invalid Mermaid chart format');
          return;
        }
        
        // Dynamically import mermaid ONLY on the client side
        const mermaid = (await import('mermaid')).default;
        
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'sans-serif',
        });

        const uniqueId = `mermaid-graph-${Math.random().toString(36).substr(2, 9)}`;
        
        // mermaid.render returns a promise with the svg code
        const { svg: svgCode } = await mermaid.render(uniqueId, cleanChart);
        setSvg(svgCode);
        setError(null);

      } catch (e) {
        console.error("Mermaid render error:", e);
        setError('Error rendering chart. Please check the chart syntax.');
      }
    };

    if (chart) {
      renderMermaid();
    } else {
      setError('No chart data provided');
    }
  }, [chart]);

  if (error) {
    return (
      <div className="alert alert-warning text-center p-3">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading chart...</p>
      </div>
    );
  }

  // Use dangerouslySetInnerHTML to render the SVG string from the state
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Mermaid;
