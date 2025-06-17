import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, areaId, text, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderRadius: "6px",
    backgroundColor: "#fff",
    display: "flex",
    gap: "8px",
    marginBottom: "6px",
    alignItems: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* ✅ 드래그 핸들 영역 분리 */}
      <div
        {...listeners}
        style={{
          cursor: "grab",
          padding: "0 4px",
          fontWeight: "bold",
        }}
      >
        ⠿
      </div>

      {/* ✅ 입력 정상 작동 */}
      <input
        type="text"
        value={text || ""}
        onChange={(e) => onEdit(areaId, id, e.target.value)}
      />

      {/* ✅ 삭제 버튼 정상 작동 */}
      <button
        onClick={() => onDelete(areaId, id)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        ❌
      </button>
    </div>
  );
};

export const ProjectRegisterMid = () => {
  const [areas, setAreas] = useState([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddArea = () => {
    const newArea = {
      id: Date.now().toString(),
      title: "New Section",
      items: [],
    };
    setAreas((prev) => [...prev, newArea]);
  };

  const handleAddItem = (areaId) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId
          ? {
              ...area,
              items: [...area.items, { id: Date.now().toString(), text: "" }],
            }
          : area
      )
    );
  };

  const handleEditItem = (areaId, itemId, value) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId
          ? {
              ...area,
              items: area.items.map((item) =>
                item.id === itemId ? { ...item, text: value } : item
              ),
            }
          : area
      )
    );
  };

  const handleDeleteItem = (areaId, itemId) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId
          ? {
              ...area,
              items: area.items.filter((item) => item.id !== itemId),
            }
          : area
      )
    );
  };

  const handleEditTitle = (areaId, value) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId ? { ...area, title: value } : area
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setAreas((prev) =>
      prev.map((area) => {
        const oldIndex = area.items.findIndex((i) => i.id === active.id);
        const newIndex = area.items.findIndex((i) => i.id === over.id);

        if (oldIndex === -1 || newIndex === -1) return area;

        return {
          ...area,
          items: arrayMove(area.items, oldIndex, newIndex),
        };
      })
    );
  };

  return (
    <>
      <button onClick={handleAddArea} className="addAreaBtn">
        + Add Section
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="midArea">
          {areas.map((area) => (
            <div className="itemArea" key={area.id}>
              <div className="itemtop">
                <input
                  type="text"
                  value={area.title}
                  onChange={(e) => handleEditTitle(area.id, e.target.value)}
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                />
              </div>

              <SortableContext
                items={area.items.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="itemList">
                  {area.items.map((item) => (
                    <SortableItem
                      key={item.id}
                      id={item.id}
                      areaId={area.id}
                      text={item.text}
                      onEdit={handleEditItem}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              </SortableContext>

              <div className="itembot">
                <button onClick={() => handleAddItem(area.id)}>
                  <img src="/images/Plusblack.svg" alt="plus" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </DndContext>
    </>
  );
};
