import React from 'react';

/**
 * HeroScene Container:
 * Full-screen autoplaying, looping, muted video background.
 * Video sits at z-0, covering the viewport.
 * Preserves original green/teal cinematic appearance of the video.
 */
export const HeroScene: React.FC = () => {
  return (
    <div
      id="hero-3d-planet-container"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
      />
      {/* Subtle overlay gradients for contrast */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </div>
  );
};
