import React, { useState, useEffect } from 'react';

const Mermaid = ({ chart }) => {
  const [svg, setSvg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will be called only on the client side
    const renderMermaid = async () => {
      try {
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
        const { svg: svgCode } = await mermaid.render(uniqueId, chart);
        setSvg(svgCode);

      } catch (e) {
        console.error("Mermaid render error:", e);
        setError('Error rendering chart.');
      }
    };

    if (chart) {
      renderMermaid();
    }
  }, [chart]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!svg) {
    return <div>Loading chart...</div>;
  }

  // Use dangerouslySetInnerHTML to render the SVG string from the state
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Mermaid;
