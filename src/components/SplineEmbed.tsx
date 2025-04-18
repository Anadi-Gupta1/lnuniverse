
import React from 'react';

interface SplineEmbedProps {
  url: string;
  height?: string;
  title?: string;
}

const SplineEmbed = ({ url, height = '550px', title = 'Spline 3D Model' }: SplineEmbedProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg" style={{ height }}>
      <iframe 
        src={url}
        title={title}
        frameBorder="0" 
        width="100%" 
        height="100%"
        loading="lazy"
        aria-label={title}
      />
    </div>
  );
};

export default SplineEmbed;
