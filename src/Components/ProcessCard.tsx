import React from 'react';

interface Tag {
  name: string;
  value: string;
}

interface Node {
  id: string;
  tags: Tag[];
}

interface ProcessCardProps {
  process: { node: Node };
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process }) => {
  if (!process || !process.node) {
    return (
      <div className="bg-gray-800 text-red-500 p-4 rounded-lg">
        Invalid Process Data
      </div>
    );
  }

  const { id, tags } = process.node;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-80">
      <h2 className="text-lg font-bold mb-2">Process ID: {id}</h2>
      <ul className="text-sm">
        {tags.map((tag, index) => (
          <li key={index} className="flex justify-between">
            <span className="font-semibold">{tag.name}:</span>
            <span>{tag.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessCard;
