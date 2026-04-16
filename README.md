PRODBOX 9-GRID STRATEGY PLANNER

SYSTEM OVERVIEW

The Prodbox 9-Grid Strategy Planner is a high-fidelity React application engineered for creative directors and top-tier marketing agencies. It provides a centralized command interface to architect, visualize, and compile complex 9-grid Instagram launch sequences.

Built with a strict adherence to brutalist, corporate minimalism and Swiss design principles, the platform strips away unnecessary friction, allowing strategists to focus purely on high-impact visual narratives and precise copywriting.

CORE ARCHITECTURE

1. AI Prompt Engineering

Integrated directly into the command header, the AI Engineer utilizes the Gemini API to instantly generate cohesive launch strategies. By inputting a core concept, the system drafts 9 sequential visual concepts and corresponding captions engineered for high-conversion business narratives.

2. The Preset Engine & Visual Directives

A centralized control panel equipped with 20 high-end advertising presets (ranging from Swiss Brutalism to Cyberpunk Neotech and Luxury Minimalist). Define the Brand Theme, Backdrop, Lighting, and Render Fidelity once, and these rules are programmatically appended to all subsequent AI image generation requests to ensure strict grid cohesion. Custom presets are automatically saved to local storage.

3. The Aesthetic Synthesizer

A smart style-extraction module capable of reverse-engineering aesthetics into reusable presets:

Brand Context: Inputs a real-world brand or artist (e.g., "Balenciaga"), utilizing AI to research their signature look, color grading, and textures, outputting a custom generative preset.

Reference Image: Analyzes uploaded source imagery to extract its core visual identity, color palette, and lighting techniques.

4. Multimodal Image Synthesis

Text-to-Image: Generates high-resolution commercial photography based on the active panel's visual concept and global directives.

Structural Injection (Image-to-Image): Upload source imagery to serve as a strict geometric framework. The multimodal AI engine will restyle the reference image to comply with the global directives while actively preventing clipping or cropping.

5. Automated Grid Compilation & Matrix Rendering

Render Matrix: A sequential, rate-limit-conscious automation tool that synthesizes all 9 grid panels consecutively with a single command.

Download Grid: Bypasses the need for third-party slicing tools. The system compiles all 9 generated panels into a single, high-resolution 3240x3240 pixel master matrix. Single assets can also be exported individually.

TECHNICAL SPECIFICATIONS

Framework: React.js

Styling: Tailwind CSS (configured for deep onyx, stark white, and severe monochromatic contrast).

Icons: Lucide React.

AI Integration: Google Gemini API (gemini-2.5-flash for strategy/synthesis, imagen-4.0 for text-to-image, and gemini-2.5-flash-image for multimodal injection).

DEPLOYMENT PROTOCOL

Refer to pipeline.md for standard operating procedures regarding campaign execution.
