import "./styles.css";

import React, {useState} from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import {SortableItem} from "./SortableItem";

const SortableListContext = ({items, setItems, children}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    const onDragEnd = event => {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.map(item => item.id).indexOf(active.id);
                const newIndex = items.map(item => item.id).indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    )
}

export default function App() {
    const [items, setItems] = useState([
        {id: "1", value: "apple"},
        {id: "2", value: "orange"},
        {id: "3", value: "pizza"}
    ]);

    return (
        <SortableListContext items={items} setItems={setItems}>
            {items.map((item) => (
                <SortableItem key={item.id} id={item.id}>{item.value}</SortableItem>
            ))}
        </SortableListContext>
    );
}
