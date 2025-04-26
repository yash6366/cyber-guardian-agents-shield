
const ArchitectureDiagram = () => {
  const layers = [
    "Multi-Agent Layer",
    "Shared Memory / State Layer",
    "Simulation Environment Layer",
    "External Data APIs",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {layers.map((layer, index) => (
        <div
          key={layer}
          className="border border-gray-700 bg-gray-800/50 rounded-lg p-4 mb-4 relative"
        >
          <div className="text-center font-medium">{layer}</div>
          {index < layers.length - 1 && (
            <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2">
              <div className="w-0.5 h-4 bg-blue-500" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArchitectureDiagram;
