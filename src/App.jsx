import React, { useState, useEffect } from 'react';
import './index.css';
import { Image as ImageIcon, Type, Copy, CheckCircle2, Edit3, Grid3X3, ArrowDownToLine, Wand2, Loader2, AlertCircle, Contrast, Palette, Sparkles, Download, UploadCloud, X, ChevronDown, Layers, Search, Focus } from 'lucide-react';

// 20 High-End Advertising Presets
const DEFAULT_STYLE_PRESETS = [
  {
    name: "Swiss Brutalism (Default)",
    styles: {
      theme: "Brutalist corporate minimalism, Swiss design principles",
      background: "Stark negative space, deep onyx or pure white",
      accents: "Sharp geometry, monochromatic contrast, severe lighting",
      quality: "High-end commercial photography, 8k, architectural precision, uncluttered"
    }
  },
  {
    name: "Luxury Minimalist",
    styles: {
      theme: "High-end luxury, refined elegance, quiet wealth",
      background: "Soft matte textures, warm alabaster or deep charcoal",
      accents: "Subtle gold or brushed steel, delicate shadows",
      quality: "Editorial fashion photography, medium format, hyper-detailed, pristine"
    }
  },
  {
    name: "Cyberpunk Neotech",
    styles: {
      theme: "Dystopian tech, futuristic streetwear, high-octane cyber",
      background: "Pitch black voids, wet asphalt textures",
      accents: "Piercing neon cyan and magenta, glowing optics, lens flares",
      quality: "Cinematic 3D render, Unreal Engine 5 style, hyper-realistic"
    }
  },
  {
    name: "Ethereal Wellness",
    styles: {
      theme: "Organic, airy, holistic health, soft aesthetics",
      background: "Breathable negative space, pale sage or linen",
      accents: "Soft organic shapes, diffused sunlight, morning dew",
      quality: "Soft-focus lifestyle photography, natural light, 35mm film grain"
    }
  },
  {
    name: "Vibrant Pop Art",
    styles: {
      theme: "Loud, youthful FMCG advertising, maximalist energy",
      background: "Saturated primary colors, seamless studio sweeps",
      accents: "Hard flash, sharp shadows, glossy plastic textures",
      quality: "Hyper-commercial studio photography, ultra-crisp, playful"
    }
  },
  {
    name: "Corporate Fintech",
    styles: {
      theme: "Trustworthy, secure, institutional financial tech",
      background: "Deep navy blue gradients, frosted glass",
      accents: "Sleek metallic UI elements, glowing data lines, crisp white",
      quality: "Clean commercial render, isometric perspective, perfectly balanced"
    }
  },
  {
    name: "Organic Earthy",
    styles: {
      theme: "Sustainable, raw materials, nature-first",
      background: "Textured sandstone, terracotta, or mossy greens",
      accents: "Raw wood, unpolished stone, harsh daylight shadows",
      quality: "Documentary style, raw and unfiltered, macro details"
    }
  },
  {
    name: "Y2K Nostalgia",
    styles: {
      theme: "Early 2000s tech, retro-futurism, playful internet culture",
      background: "Liquid chrome, translucent plastics, metallic silver",
      accents: "Holographic gradients, wireframe spheres, bubble typography",
      quality: "Slightly lo-fi digital camera aesthetic mixed with sharp 3D"
    }
  },
  {
    name: "High-Octane Sports",
    styles: {
      theme: "Athletic intensity, grit, adrenaline, performance",
      background: "Dark stadium lighting, asphalt, concrete",
      accents: "Dynamic motion blur, glowing sweat, harsh rim lighting",
      quality: "High-speed sports photography, dramatic contrast, highly detailed"
    }
  },
  {
    name: "Monochrome Noir",
    styles: {
      theme: "Cinematic film noir, dramatic tension, pure monochrome",
      background: "Inky blacks, devoid of color",
      accents: "Volumetric fog, Venetian blind shadows, harsh spotlights",
      quality: "Classic black and white cinema, high grain, moody"
    }
  },
  {
    name: "Scandi Minimalist",
    styles: {
      theme: "Scandinavian functionalism, cozy but sterile, hygge",
      background: "Warm whites, pale ash wood textures",
      accents: "Muted pastels, soft linen folds, indirect natural light",
      quality: "Interior design magazine aesthetic, perfectly straight verticals"
    }
  },
  {
    name: "Neon Vaporwave",
    styles: {
      theme: "Synthwave, 80s retro-futurism, nostalgic digital",
      background: "Neon grid lines, sunset gradients",
      accents: "Hot pinks, electric blues, glitch effects, VHS static",
      quality: "Stylized digital art, retro arcade aesthetics"
    }
  },
  {
    name: "Industrial Grunge",
    styles: {
      theme: "Raw streetwear, urban decay, underground music",
      background: "Distressed concrete, rusted metal, chainlink",
      accents: "Caution tape yellow, harsh flash, gritty textures",
      quality: "Disposable camera flash aesthetic, raw, unpolished"
    }
  },
  {
    name: "Moody Culinary",
    styles: {
      theme: "High-end gastronomy, rich flavors, dark kitchen",
      background: "Dark slate, scorched wood, deep shadows",
      accents: "Directional window light, glowing embers, rich ingredient colors",
      quality: "Michelin-star food photography, macro depth of field"
    }
  },
  {
    name: "Futuristic Automotive",
    styles: {
      theme: "Sleek mobility, aerodynamic design, speed",
      background: "Infinite dark studio void, wet reflective floors",
      accents: "Sweeping LED light trails, carbon fiber textures",
      quality: "Commercial car rendering, hyper-reflective, flawless surfaces"
    }
  },
  {
    name: "Holographic Iridescent",
    styles: {
      theme: "Modern beauty tech, prismatic, sleek and fluid",
      background: "Liquid glass, iridescent gradients",
      accents: "Rainbow refractions, soap bubble textures, soft glowing light",
      quality: "High-end cosmetic photography, macro, luminous"
    }
  },
  {
    name: "Psychedelic Maximalism",
    styles: {
      theme: "Overwhelming visual noise, trippy, avant-garde",
      background: "Swirling optical illusions, clashing neon patterns",
      accents: "Melted typography, kaleidoscope effects",
      quality: "Highly stylized 3D art, surrealist, bold"
    }
  },
  {
    name: "Soft Pastel Dream",
    styles: {
      theme: "Gen Z lifestyle, soft candy aesthetics, innocent",
      background: "Millennial pinks, soft lilac, baby blue",
      accents: "Fluffy textures, clouds, soft glowing auras",
      quality: "Dreamy, slightly overexposed, soft-focus"
    }
  },
  {
    name: "Hyper-Real 3D",
    styles: {
      theme: "Playful tech, satisfying physics, abstract geometry",
      background: "Seamless matte studio backdrops in pastel tones",
      accents: "Glossy plastics, satisfying collisions, bouncy textures",
      quality: "Cinema 4D render style, perfect lighting, hyper-tactile"
    }
  },
  {
    name: "Retro 70s Vintage",
    styles: {
      theme: "Nostalgic warmth, analog era, soulful",
      background: "Mustard yellows, burnt orange, brown corduroy",
      accents: "Lens flares, light leaks, heavy film grain",
      quality: "Vintage Kodak film aesthetic, warm and inviting"
    }
  }
];

// Pre-loaded data reflecting a high-end, brutalist agency narrative
const INITIAL_POSTS = [
  { id: 9, position: 'Top Left', title: 'Post 9 (Upload 9th)', visual: 'Stark negative space. A microscopic, precision-engineered badge reading "V1.0 DEPLOYED".', caption: 'V1.0 Framework deployed.\nThe complete architecture is now visible on our grid. Prodbox Studio is operational.\n#ProdboxFramework #StrategicExecution #DesignArchitecture' },
  { id: 8, position: 'Top Middle', title: 'Post 8 (Upload 8th)', visual: 'Massive, severe sans-serif typography filling the frame: ENROLLMENT ACTIVE.', caption: 'ENROLLMENT ACTIVE.\nAccess to the Prodbox Studio framework is now open to select partners. Proceed to the link in our bio to secure your access before capacity is reached.\n#Enrollment #AgencyLaunch #SystemScale' },
  { id: 7, position: 'Top Right', title: 'Post 7 (Upload 7th)', visual: 'A sharp, metallic geometric structure intersecting with pure black shadow. Quote overlay: "PRECISION IN EXECUTION".', caption: 'Precision in execution.\nGood design is ubiquitous. Exceptional design is engineered. Let us architect your next phase.\n#DesignEngineering #Craftsmanship #Prodbox' },
  { id: 6, position: 'Middle Left', title: 'Post 6 (Upload 6th)', visual: 'Abstract representation of systemized workflows—wireframes intersecting with architectural grid lines.', caption: 'Systematized workflows.\nWe deploy industry-standard architectures that optimize time and elevate output. Master the process.\n#WorkflowOptimization #DesignSystems #Infrastructure' },
  { id: 5, position: 'The Center', title: 'Post 5 (Upload 5th)', visual: 'The focal point. Monochromatic contrast. The PRODBOX STUDIO logotype executed in stark white against deep onyx.', caption: 'PRODBOX STUDIO.\nA new paradigm in strategic execution. We built this for relentless builders. Enrollment is active. Proceed to the link in bio.\n#ProdboxStudio #Agency #StrategicVision' },
  { id: 4, position: 'Middle Right', title: 'Post 4 (Upload 4th)', visual: 'A high-fidelity, monochromatic UI component floating in a void of negative space.', caption: 'Architect. Launch. Scale.\nAt Prodbox Studio, we engineer tangible assets that position your portfolio in the top percentile.\n#ProductDesign #Scale #UIArchitecture' },
  { id: 3, position: 'Bottom Left', title: 'Post 3 (Upload 3rd)', visual: 'Brutalist typography indicating a timeline: "INITIATION: IMMEDIATE".', caption: 'Initiation commences.\nThe optimal time to upgrade your infrastructure is now. Acknowledge readiness below.\n#Initiation #DesignStudio #Execution' },
  { id: 2, position: 'Bottom Middle', title: 'Post 2 (Upload 2nd)', visual: 'High-contrast typography aligned to the baseline: "RESTRICTED ACCESS".', caption: 'RESTRICTED ACCESS.\nOur cohorts remain small to maximize yield. Spots are strictly limited to ensure uncompromising quality.\n#RestrictedAccess #ExclusiveCohort #Prodbox' },
  { id: 1, position: 'Bottom Right', title: 'Post 1 (Upload 1st)', visual: 'A harsh, diagonal geometric arrow pointing upward. Monochromatic CTA: "INITIALIZE IN BIO".', caption: 'The gateway is open.\nDo not merely observe industry shifts—engineer them. Link in bio to initiate.\n#Initialize #ProdboxLaunch #CreativeDirection' }
];

export default function App() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activePostId, setActivePostId] = useState(5);
  const [copied, setCopied] = useState(false);
  const [enableInversion, setEnableInversion] = useState(false);

  // Load presets from LocalStorage or default
  const [presets, setPresets] = useState(() => {
    const saved = localStorage.getItem('prodbox-custom-presets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_STYLE_PRESETS;
      }
    }
    return DEFAULT_STYLE_PRESETS;
  });

  const [projectTitle, setProjectTitle] = useState("Prodbox Studio");
  const [promptInput, setPromptInput] = useState("");
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  // Aesthetic Synthesizer State
  const [synthMode, setSynthMode] = useState('brand'); // 'brand' or 'image'
  const [synthInput, setSynthInput] = useState("");
  const [synthImage, setSynthImage] = useState(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const [activePresetName, setActivePresetName] = useState(presets[0].name);
  const [globalStyles, setGlobalStyles] = useState(presets[0].styles);

  const activePost = posts.find(p => p.id === activePostId);

  // Save to localstorage whenever presets change
  useEffect(() => {
    localStorage.setItem('prodbox-custom-presets', JSON.stringify(presets));
  }, [presets]);

  const handlePresetChange = (e) => {
    const presetName = e.target.value;
    setActivePresetName(presetName);
    const preset = presets.find(p => p.name === presetName);
    if (preset) {
      setGlobalStyles(preset.styles);
    }
  };

  const handleStyleChange = (field, value) => {
    setActivePresetName("Custom (Unsaved)");
    setGlobalStyles(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePost = (field, value) => {
    setPosts(prev => prev.map(p => p.id === activePostId ? { ...p, [field]: value } : p));
  };

  // --- AESTHETIC SYNTHESIZER LOGIC ---
  const handleSynthImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setSynthImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleSynthesizePreset = async () => {
    if (synthMode === 'brand' && !synthInput.trim()) return;
    if (synthMode === 'image' && !synthImage) return;

    setIsSynthesizing(true);
    const apiKey = ""; 

    try {
      let response, result, textOutput;

      const generationConfig = {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            presetName: { type: "STRING" },
            styles: {
              type: "OBJECT",
              properties: {
                theme: { type: "STRING" },
                background: { type: "STRING" },
                accents: { type: "STRING" },
                quality: { type: "STRING" }
              }
            }
          },
          required: ["presetName", "styles"]
        }
      };

      if (synthMode === 'brand') {
        const systemPrompt = `You are a world-class creative director. The user wants to extract the visual identity and core aesthetic of the brand/artist/concept: "${synthInput}". 
        Analyze their signature look, color grading, lighting, and textures. Return a highly descriptive JSON object to be used as a generative AI style preset. Ensure the terminology is high-end and professional.`;

        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            tools: [{ google_search: {} }], // Use search to research the brand!
            generationConfig
          })
        });
      } else {
        const systemPrompt = `You are an expert creative director. Analyze the uploaded reference image. Extract its core visual identity, color palette, lighting techniques, and textures. Reverse engineer this into a reusable generative AI style preset. Return a highly descriptive JSON object.`;
        const base64Data = synthImage.split(',')[1];
        const mimeMatch = synthImage.match(/data:(.*?);base64/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: systemPrompt },
                { inlineData: { mimeType, data: base64Data } }
              ]
            }],
            generationConfig
          })
        });
      }

      if (!response.ok) throw new Error('API Error ' + response.status);
      result = await response.json();
      textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (textOutput) {
        const newPreset = JSON.parse(textOutput);
        // Add indicator that this is a custom extracted preset
        newPreset.name = `[Extracted] ${newPreset.presetName}`;
        
        // Save to presets array (prepend it)
        setPresets(prev => [newPreset, ...prev]);
        
        // Automatically select it
        setActivePresetName(newPreset.name);
        setGlobalStyles(newPreset.styles);

        // Reset inputs
        setSynthInput("");
        setSynthImage(null);
      }
    } catch (e) {
      console.error("Synthesis failed", e);
      alert("Failed to synthesize aesthetic. Please try again.");
    }
    setIsSynthesizing(false);
  };
  // -----------------------------------

  const handleReferenceImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => handleUpdatePost('referenceImage', event.target.result);
    reader.readAsDataURL(file);
  };

  const handleDownloadGrid = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const SIZE = 1080;
      canvas.width = SIZE * 3;
      canvas.height = SIZE * 3;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const getPos = (id) => {
        switch(id) {
          case 9: return {x: 0, y: 0};
          case 8: return {x: SIZE, y: 0};
          case 7: return {x: SIZE*2, y: 0};
          case 6: return {x: 0, y: SIZE};
          case 5: return {x: SIZE, y: SIZE};
          case 4: return {x: SIZE*2, y: SIZE};
          case 3: return {x: 0, y: SIZE*2};
          case 2: return {x: SIZE, y: SIZE*2};
          case 1: return {x: SIZE*2, y: SIZE*2};
          default: return {x: 0, y: 0};
        }
      };

      const loadImage = (src) => new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = src;
      });

      await Promise.all(posts.map(async (post) => {
        if (post.imageUrl) {
          const img = await loadImage(post.imageUrl);
          if (img) {
            const pos = getPos(post.id);
            ctx.drawImage(img, pos.x, pos.y, SIZE, SIZE);
          }
        }
      }));

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'prodbox-9-grid-master.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Grid compilation failed:", e);
      alert("Failed to compile grid framework.");
    }
    setIsDownloading(false);
  };

  const handleDownloadSingleImage = (imageUrl, panelId) => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `prodbox-panel-${panelId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateAllImages = async () => {
    setIsGeneratingAll(true);
    for (const post of posts) {
      if (post.visual.trim()) {
        await handleGenerateImage(post.id, post.visual);
      }
    }
    setIsGeneratingAll(false);
  };

  const handleGenerateStrategy = async () => {
    if (!promptInput.trim() || isGeneratingStrategy) return;
    setIsGeneratingStrategy(true);
    
    const apiKey = ""; 
    const currentStyleContext = `Theme: ${globalStyles.theme}. Background: ${globalStyles.background}. Accents: ${globalStyles.accents}. Quality: ${globalStyles.quality}.`;
    
    const systemPrompt = `You are a high-end creative director at a top-tier advertising agency. The user wants a 9-grid puzzle post launch strategy for: "${promptInput}". 
    Create a project title and write visual concepts and captions for all 9 posts.
    
    CRITICAL INSTRUCTION: The tone and visuals MUST align perfectly with the user's selected global aesthetic: [${currentStyleContext}]. 
    If the aesthetic is brutalist/corporate, use highly professional, stark language without emojis. If the aesthetic is vibrant or youth-oriented, adapt the tone accordingly but maintain top-tier advertising agency standards.
    Posts must flow logically from Post 1 (bottom right) to Post 9 (top left). Do not alter the globalStyles, just echo them back.`;

    const delays = [1000, 2000, 4000, 8000, 16000];
    
    const makeRequest = async (retryCount = 0) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  projectTitle: { type: "STRING" },
                  globalStyles: {
                    type: "OBJECT",
                    properties: {
                      theme: { type: "STRING" },
                      background: { type: "STRING" },
                      accents: { type: "STRING" },
                      quality: { type: "STRING" }
                    }
                  },
                  posts: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        id: { type: "INTEGER" },
                        visual: { type: "STRING" },
                        caption: { type: "STRING" }
                      }
                    }
                  }
                }
              }
            }
          })
        });

        if (!response.ok) throw new Error('API Error ' + response.status);
        const result = await response.json();
        const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (textOutput) {
          const generatedStrategy = JSON.parse(textOutput);
          setProjectTitle(generatedStrategy.projectTitle || promptInput);
          if (generatedStrategy.globalStyles && generatedStrategy.globalStyles.theme) {
             setGlobalStyles(generatedStrategy.globalStyles);
             setActivePresetName("Custom (AI Adapted)");
          }
          setPosts(prevPosts => prevPosts.map(p => {
            const aiPost = generatedStrategy.posts.find(ap => ap.id === p.id);
            return aiPost ? { ...p, visual: aiPost.visual, caption: aiPost.caption, imageUrl: null } : p;
          }));
          setPromptInput("");
        }
      } catch (err) {
        if (retryCount < delays.length) {
          await new Promise(r => setTimeout(r, delays[retryCount]));
          return makeRequest(retryCount + 1);
        }
        console.error("Failed to generate strategy:", err);
        alert("Failed to generate strategy. Please try again.");
      }
    };

    await makeRequest();
    setIsGeneratingStrategy(false);
  };

  const handleGenerateImage = async (postId, promptText) => {
    if (!promptText.trim()) return;

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isGenerating: true, error: null } : p));
    const apiKey = ""; 
    
    let styleRules = Object.values(globalStyles).filter(v => v.trim() !== '').join(", ");
    if (!styleRules) styleRules = "Brutalist corporate minimalism, Swiss design, uncluttered, high-end commercial aesthetic. Architectural precision, sharp lighting.";

    if (enableInversion && [2, 4, 6, 8].includes(postId)) {
      styleRules = "INVERTED AESTHETIC, pristine bright white negative space, highly contrasting dark geometric accents, uncluttered commercial minimalism. High-end architectural photography.";
    }

    const activePostData = posts.find(p => p.id === postId);
    const hasReference = !!activePostData?.referenceImage;

    let finalPrompt = "";
    if (hasReference) {
      finalPrompt = `CRITICAL INSTRUCTION: Analyze the provided reference image. Maintain the exact framing, scale, and composition. DO NOT crop, clip, or zoom in on the subject. Keep the entire subject fully visible within the canvas. Transform the aesthetic of the image completely to strictly adhere to the following directives: Professional commercial photography, highly minimalist, uncluttered. ${styleRules}. VISUAL CONCEPT: ${promptText}. NEGATIVE PROMPT: No cartoonish elements, no playful designs, strict business narrative.`;
    } else {
      finalPrompt = `Professional commercial photography, highly minimalist, uncluttered. ${styleRules}. ${promptText}. No cartoonish elements, no playful designs, strict business narrative.`;
    }
    
    const delays = [1000, 2000, 4000, 8000, 16000];

    const makeRequest = async (retryCount = 0) => {
      try {
        let response, result, finalImageUrl;

        if (hasReference) {
          const base64Data = activePostData.referenceImage.split(',')[1];
          const mimeMatch = activePostData.referenceImage.match(/data:(.*?);base64/);
          const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: finalPrompt }, { inlineData: { mimeType, data: base64Data } }] }],
              generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
            })
          });

          if (!response.ok) throw new Error('API Error ' + response.status);
          result = await response.json();
          const outputBase64 = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
          if (!outputBase64) throw new Error("Multimodal failure: No imagery returned.");
          finalImageUrl = `data:image/png;base64,${outputBase64}`;

        } else {
          response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              instances: { prompt: finalPrompt },
              parameters: { sampleCount: 1 }
            })
          });

          if (!response.ok) throw new Error('API Error ' + response.status);
          result = await response.json();
          if (result.predictions && result.predictions[0] && result.predictions[0].bytesBase64Encoded) {
            finalImageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
          } else {
            throw new Error('Invalid response framework');
          }
        }
        return finalImageUrl;
      } catch (err) {
        if (retryCount < delays.length) {
          await new Promise(r => setTimeout(r, delays[retryCount]));
          return makeRequest(retryCount + 1);
        }
        throw err;
      }
    };

    try {
      const imageUrl = await makeRequest();
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, imageUrl, isGenerating: false } : p));
    } catch (err) {
      console.error("Failed to generate image", err);
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, isGenerating: false, error: "Failed to generate image. Please try again." } : p));
    }
  };

  const generateExportText = () => {
    const sortedPosts = [...posts].sort((a, b) => a.id - b.id);
    let exportText = "PRODBOX STUDIO 9-GRID LAUNCH SEQUENCE\n\nEXECUTION DIRECTIVE: Upload sequence dictates grid integrity. Commence with Post 1 (bottom right) and conclude with Post 9 (top left).\n\n";
    sortedPosts.forEach(p => {
      exportText += `---------------------------------------\n`;
      exportText += `[ ${p.title} - ${p.position} ]\n`;
      exportText += `VISUAL COMPOSITION: ${p.visual}\n\n`;
      exportText += `COPYWRITING:\n${p.caption}\n\n`;
    });
    return exportText;
  };

  const copyToClipboard = () => {
    const text = generateExportText();
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
    document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-white selection:text-black pb-12">
      {/* Header */}
      <header className="border-b border-neutral-900 bg-[#050505] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row gap-6 justify-between items-center">
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-widest text-white uppercase truncate max-w-[200px]">{projectTitle}</h1>
              <p className="text-[10px] text-neutral-500 font-medium tracking-[0.2em] uppercase mt-0.5">Strategy Planner</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Sparkles className={`w-4 h-4 ${isGeneratingStrategy ? 'text-white animate-pulse' : 'text-neutral-600 group-focus-within:text-white'} transition-colors`} />
            </div>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateStrategy()}
              placeholder="Define launch concept (e.g. Minimalist architectural firm)..."
              disabled={isGeneratingStrategy}
              className="w-full bg-[#0a0a0a] border border-neutral-800 text-neutral-200 text-sm pl-12 pr-32 py-3 focus:outline-none focus:border-white focus:ring-0 transition-all disabled:opacity-50"
            />
            <button
              onClick={handleGenerateStrategy}
              disabled={isGeneratingStrategy || !promptInput.trim()}
              className="absolute inset-y-1 right-1 bg-white hover:bg-neutral-200 disabled:bg-neutral-900 disabled:text-neutral-600 text-black text-[10px] uppercase tracking-widest font-bold px-4 py-2 transition-colors flex items-center gap-2"
            >
              {isGeneratingStrategy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              {isGeneratingStrategy ? 'Drafting' : 'Generate'}
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            <button onClick={copyToClipboard} className={`flex items-center gap-2 px-5 py-3 font-bold transition-all text-[10px] uppercase tracking-widest whitespace-nowrap ${copied ? 'bg-neutral-800 text-white' : 'bg-transparent border border-neutral-800 hover:border-neutral-500 text-white'}`}>
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Export'}
            </button>
            <button onClick={handleGenerateAllImages} disabled={isGeneratingAll || isDownloading} className="flex items-center gap-2 px-5 py-3 font-bold transition-all text-[10px] uppercase tracking-widest whitespace-nowrap bg-neutral-800 text-white hover:bg-neutral-700 disabled:opacity-50">
              {isGeneratingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />} {isGeneratingAll ? 'Rendering Matrix' : 'Render Matrix'}
            </button>
            <button onClick={handleDownloadGrid} disabled={isDownloading || isGeneratingAll} className="flex items-center gap-2 px-5 py-3 font-bold transition-all text-[10px] uppercase tracking-widest whitespace-nowrap bg-white text-black hover:bg-neutral-200 disabled:opacity-50">
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} {isDownloading ? 'Compiling' : 'Download Grid'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: The 3x3 Grid Simulator & Directives */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8">
            
            {/* Grid Architecture */}
            <div className="bg-[#050505] border border-neutral-900 p-6">
              <div className="flex items-center justify-between mb-8 border-b border-neutral-900 pb-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 text-white">
                  <Grid3X3 className="w-4 h-4 text-neutral-500" /> Grid Architecture
                </h2>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest">Top to Bottom</span>
              </div>
              <div className="grid grid-cols-3 gap-1 aspect-square bg-neutral-900 border border-neutral-900 p-1">
                {posts.map((post) => {
                  const isTargetPanel = [2, 4, 6, 8].includes(post.id);
                  const isInverted = enableInversion && isTargetPanel;
                  return (
                    <button key={post.id} onClick={() => setActivePostId(post.id)} className={`relative group flex flex-col items-center justify-center transition-all duration-300 overflow-hidden ${activePostId === post.id ? 'ring-1 ring-inset ring-white z-10' : 'hover:opacity-80'} ${isInverted ? 'bg-neutral-200' : 'bg-[#0a0a0a]'}`}>
                      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${isInverted ? 'opacity-90 group-hover:opacity-100' : 'opacity-40 group-hover:opacity-60 grayscale hover:grayscale-0'}`} />}
                      <span className={`relative z-10 text-2xl font-light transition-colors ${isInverted ? 'text-black' : 'text-neutral-400 group-hover:text-white'} ${activePostId === post.id ? (isInverted ? '!text-black font-medium' : '!text-white font-medium') : ''}`}>{post.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Aesthetic Synthesizer (NEW MODULE) */}
            <div className="bg-[#050505] border border-neutral-900 p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
              <div className="flex items-center justify-between mb-6 border-b border-neutral-900 pb-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 text-white">
                  <Focus className="w-4 h-4 text-neutral-500" /> Aesthetic Synthesizer
                </h2>
              </div>
              <p className="text-[10px] text-neutral-500 leading-relaxed mb-5">
                Extract the visual identity from a real-world brand or a reference image to save as a custom Global Preset.
              </p>

              <div className="flex bg-[#0a0a0a] border border-neutral-800 p-1 mb-4">
                <button onClick={() => setSynthMode('brand')} className={`flex-1 text-[9px] uppercase tracking-[0.2em] py-2 font-bold transition-colors ${synthMode === 'brand' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}>Brand Context</button>
                <button onClick={() => setSynthMode('image')} className={`flex-1 text-[9px] uppercase tracking-[0.2em] py-2 font-bold transition-colors ${synthMode === 'image' ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'}`}>Reference Image</button>
              </div>

              {synthMode === 'brand' ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                    <input type="text" value={synthInput} onChange={(e) => setSynthInput(e.target.value)} placeholder="e.g. Balenciaga, Virgil Abloh..." className="w-full bg-[#0a0a0a] border border-neutral-800 pl-10 pr-4 py-3 text-xs text-neutral-200 focus:outline-none focus:border-white transition-all" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {synthImage ? (
                    <div className="relative w-full h-24 border border-neutral-800 group">
                      <img src={synthImage} alt="Synth Ref" className="w-full h-full object-cover opacity-70" />
                      <button onClick={() => setSynthImage(null)} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-5 h-5 text-white" /></button>
                    </div>
                  ) : (
                    <label className="cursor-pointer border border-neutral-800 hover:border-neutral-500 bg-[#0a0a0a] text-neutral-600 hover:text-white transition-colors w-full h-24 flex flex-col items-center justify-center gap-2">
                      <UploadCloud className="w-5 h-5" />
                      <span className="text-[8px] uppercase tracking-widest font-bold">Upload Style Reference</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleSynthImageUpload} />
                    </label>
                  )}
                </div>
              )}

              <button 
                onClick={handleSynthesizePreset} 
                disabled={isSynthesizing || (synthMode === 'brand' ? !synthInput : !synthImage)}
                className="w-full mt-4 bg-transparent border border-white text-white hover:bg-white hover:text-black disabled:border-neutral-800 disabled:text-neutral-600 disabled:hover:bg-transparent py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {isSynthesizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {isSynthesizing ? 'Extracting Identity...' : 'Synthesize & Save'}
              </button>
            </div>

            {/* Visual Directives */}
            <div className="bg-[#050505] border border-neutral-900 p-6">
              <div className="flex items-center justify-between mb-6 border-b border-neutral-900 pb-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold flex items-center gap-3 text-white">
                  <Palette className="w-4 h-4 text-neutral-500" /> Visual Directives
                </h2>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-2 pb-4 border-b border-neutral-900">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-white font-bold">Global Preset</label>
                  <div className="relative">
                    <select value={activePresetName} onChange={handlePresetChange} className="w-full bg-white text-black border-none p-3 text-xs font-bold uppercase tracking-widest appearance-none focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all cursor-pointer">
                      <option value="Custom (Unsaved)" disabled className="hidden">Custom (Unsaved)</option>
                      <option value="Custom (AI Adapted)" disabled className="hidden">Custom (AI Adapted)</option>
                      {presets.map((preset) => (
                        <option key={preset.name} value={preset.name}>{preset.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-black" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-neutral-500 font-semibold">Brand Theme</label>
                  <input type="text" value={globalStyles.theme} onChange={(e) => handleStyleChange('theme', e.target.value)} className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 text-xs text-neutral-200 focus:outline-none focus:border-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-neutral-500 font-semibold">Backdrop</label>
                  <input type="text" value={globalStyles.background} onChange={(e) => handleStyleChange('background', e.target.value)} className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 text-xs text-neutral-200 focus:outline-none focus:border-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-neutral-500 font-semibold">Lighting & Accents</label>
                  <input type="text" value={globalStyles.accents} onChange={(e) => handleStyleChange('accents', e.target.value)} className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 text-xs text-neutral-200 focus:outline-none focus:border-white transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.15em] text-neutral-500 font-semibold">Render Fidelity</label>
                  <input type="text" value={globalStyles.quality} onChange={(e) => handleStyleChange('quality', e.target.value)} className="w-full bg-[#0a0a0a] border border-neutral-800 p-3 text-xs text-neutral-200 focus:outline-none focus:border-white transition-all" />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-neutral-900 flex items-center justify-between group cursor-pointer" onClick={() => setEnableInversion(!enableInversion)}>
                <div className="space-y-1 pr-4">
                  <label className="text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-300 flex items-center gap-2 cursor-pointer">
                    <Contrast className={`w-3.5 h-3.5 ${enableInversion ? 'text-white' : 'text-neutral-600'}`} /> High-Contrast Alternation
                  </label>
                  <p className="text-[10px] text-neutral-600 tracking-wide mt-1">Force inverted lighting on alternate panels (2, 4, 6, 8).</p>
                </div>
                <div className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center transition-colors duration-300 ease-in-out ${enableInversion ? 'bg-white' : 'bg-neutral-800'}`}>
                  <span className={`inline-block h-3 w-3 transform bg-black transition duration-300 ease-in-out ${enableInversion ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editor Panel */}
          <div className="lg:col-span-7 xl:col-span-8">
            {activePost ? (
              <div className="bg-[#050505] border border-neutral-900 flex flex-col h-full min-h-[600px]">
                <div className="px-8 py-6 border-b border-neutral-900 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">{activePost.position}</span>
                      {activePost.id === 5 && <span className="px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] bg-white text-black font-bold">Keystone</span>}
                      {(enableInversion && [2, 4, 6, 8].includes(activePost.id)) && <span className="px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] border border-neutral-700 text-neutral-300 font-bold flex items-center gap-1.5"><Contrast className="w-2.5 h-2.5" /> Inverted</span>}
                    </div>
                    <h2 className="text-2xl font-light text-white tracking-wide">{activePost.title}</h2>
                  </div>
                  <div className="w-12 h-12 border border-neutral-800 flex items-center justify-center">
                    <span className="text-xl font-light text-neutral-400">{activePost.id}</span>
                  </div>
                </div>

                <div className="p-8 space-y-8 flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                      <label className="flex items-center gap-3 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        <ImageIcon className="w-3.5 h-3.5" /> Visual Concept
                      </label>
                      <button onClick={() => handleGenerateImage(activePost.id, activePost.visual)} disabled={activePost.isGenerating || !activePost.visual.trim()} className="flex items-center gap-2 text-[10px] bg-white text-black hover:bg-neutral-200 px-4 py-2 font-bold uppercase tracking-widest transition-colors disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-500">
                        {activePost.isGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />} {activePost.isGenerating ? 'Rendering...' : 'Generate Art'}
                      </button>
                    </div>

                    {activePost.error && (
                      <div className="flex items-center gap-3 text-neutral-300 text-xs bg-red-950/30 p-4 border border-red-900/50">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /> {activePost.error}
                      </div>
                    )}

                    {activePost.imageUrl && (
                      <div className="w-full aspect-[16/9] overflow-hidden border border-neutral-800 relative group bg-neutral-900">
                        <img src={activePost.imageUrl} alt="Generated Visual" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/80 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                          <button onClick={() => handleGenerateImage(activePost.id, activePost.visual)} disabled={activePost.isGenerating} className="bg-white text-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-neutral-200 transition-colors disabled:opacity-50">
                            {activePost.isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />} Regenerate
                          </button>
                          <button onClick={() => handleDownloadSingleImage(activePost.imageUrl, activePost.id)} className="bg-transparent border border-white text-white px-6 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-3 hover:bg-white hover:text-black transition-colors">
                            <Download className="w-4 h-4" /> Download Asset
                          </button>
                        </div>
                      </div>
                    )}

                    <textarea value={activePost.visual} onChange={(e) => handleUpdatePost('visual', e.target.value)} className="w-full h-24 bg-[#0a0a0a] border border-neutral-800 p-4 text-sm text-neutral-300 focus:outline-none focus:border-white transition-all leading-relaxed" placeholder="Detail the visual composition..." />

                    <div className="mt-4 flex items-center gap-6 border-t border-neutral-900 pt-5">
                      {activePost.referenceImage ? (
                        <div className="relative group w-20 h-20 border border-neutral-800 flex-shrink-0 bg-neutral-900">
                          <img src={activePost.referenceImage} alt="Reference Base" className="w-full h-full object-cover opacity-50 grayscale" />
                          <button onClick={() => handleUpdatePost('referenceImage', null)} className="absolute inset-0 flex items-center justify-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-5 h-5 text-white" /></button>
                        </div>
                      ) : (
                        <label className="cursor-pointer border border-neutral-800 hover:border-neutral-500 bg-[#0a0a0a] text-neutral-600 hover:text-white transition-colors w-20 h-20 flex flex-col items-center justify-center gap-2 group flex-shrink-0">
                          <UploadCloud className="w-5 h-5" />
                          <span className="text-[8px] uppercase tracking-widest font-bold">Inject</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleReferenceImageUpload} />
                        </label>
                      )}
                      <div className="flex-1">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-300 mb-1">Structural Reference</h4>
                        <p className="text-[10px] text-neutral-500 leading-relaxed tracking-wide">Upload source imagery. The AI engine will utilize this as a strict geometric framework while aggressively enforcing the global brutalist directives upon rendering.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-b border-neutral-900 pb-3">
                      <label className="flex items-center gap-3 text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
                        <Type className="w-3.5 h-3.5" /> Copywriting
                      </label>
                    </div>
                    <textarea value={activePost.caption} onChange={(e) => handleUpdatePost('caption', e.target.value)} className="w-full h-64 bg-[#0a0a0a] border border-neutral-800 p-5 text-sm text-neutral-300 focus:outline-none focus:border-white transition-all leading-relaxed" placeholder="Draft the post copy..." />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#050505] border border-neutral-900 h-full flex flex-col items-center justify-center p-12 text-center min-h-[600px]">
                <div className="w-16 h-16 border border-neutral-800 flex items-center justify-center mb-6">
                  <Edit3 className="w-6 h-6 text-neutral-600" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-3">Awaiting Selection</h3>
                <p className="text-xs text-neutral-500 max-w-sm tracking-wide leading-relaxed">Select a coordinate from the grid architecture to begin editing the layout and narrative.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}