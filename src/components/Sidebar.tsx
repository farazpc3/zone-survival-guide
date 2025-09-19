"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
};

function buildTree(headings: Heading[]): Heading[] {
  const root: Heading[] = [];
  const stack: Heading[] = [];

  headings.forEach((h) => {
    while (stack.length > 0 && stack[stack.length - 1].level >= h.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(h);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.children) parent.children = [];
      parent.children.push(h);
    }

    stack.push(h);
  });

  return root;
}

function GlowButton({
  text,
  href,
  children,
}: {
  text: string;
  href?: string;
  children?: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleClick = () => {
    if (children) setExpanded(!expanded);
    if (href)
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mb-1">
      <button
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        className="relative w-full text-left px-3 py-2 rounded-lg bg-blue shadow-md border
                   transition active:translate-y-[2px] active:shadow-inner"
        style={
          mounted
            ? {
                backgroundImage: `radial-gradient(circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.25), transparent 40%)`,
              }
            : {}
        }
      >
        {text}
      </button>
      {expanded && children && (
        <div className="ml-4 border-l pl-3 mt-1">{children}</div>
      )}
    </div>
  );
}

function RenderTree({ nodes }: { nodes: Heading[] }) {
  return (
    <div>
      {nodes.map((node) => (
        <GlowButton key={node.id} text={node.text} href={`#${node.id}`}>
          {node.children && <RenderTree nodes={node.children} />}
        </GlowButton>
      ))}
    </div>
  );
}

export default function Sidebar() {
  const [tree, setTree] = useState<Heading[]>([]);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h2, h3, h4")
    ) as HTMLElement[];

    const flat: Heading[] = elements.map((el) => ({
      id: el.id,
      text: el.innerText,
      level: parseInt(el.tagName.replace("H", ""), 10),
    }));

    setTree(buildTree(flat));
  }, []);

  return (
    <aside className="w-64 sticky top-4 h-fit p-4 bg-gray-5 rounded-2xl shadow-lg">
      <h2 className="text-lg font-bold mb-3">On this page</h2>
      <nav>
        <RenderTree nodes={tree} />
      </nav>
    </aside>
  );
}
