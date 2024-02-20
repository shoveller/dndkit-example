import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const useSortableProps = (id) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return {
    attributes,
    listeners,
    ref: setNodeRef,
    style
  }
}

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    ref,
    style,
  } = useSortableProps(props.id);

  return (
    <div {...attributes} {...listeners} className="list-row" ref={ref} style={style}>
      <span>{props.children}</span>
    </div>
  );
}
