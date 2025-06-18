import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ✅ 드래그 가능한 아이템
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
    padding: "6px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div {...listeners} style={{ cursor: "grab", padding: "0 4px" }}>
        ⠿
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => onEdit(areaId, id.split(":")[1], e.target.value)}
      />
      <button
        onClick={() => onDelete(areaId, id.split(":")[1])}
        onPointerDown={(e) => e.stopPropagation()}
      >
        X
      </button>
    </div>
  );
};

// ✅ 빈 Area(섹션)용 DropZone
const EmptyDropZone = ({ areaId }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `empty-area-${areaId}`,
    data: { areaId },
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: 48,
        border: "2px dashed #bbb",
        borderRadius: 8,
        margin: "12px 0",
        background: isOver ? "#dbeafe" : "#f9fafb",
        color: "#aaa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 15,
        fontStyle: "italic",
      }}
    >
      여기에 아이템을 드롭하세요
    </div>
  );
};

export const ProjectRegisterMid = () => {
  const [areas, setAreas] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // 섹션(Area) 추가/삭제/수정
  const handleAddArea = () => {
    const newArea = {
      id: Date.now().toString(),
      title: "New Section",
      items: [],
    };
    setAreas((prev) => [...prev, newArea]);
  };

  const handleDeleteArea = (areaId) => {
    setAreas((prev) => prev.filter((area) => area.id !== areaId));
  };

  const handleEditTitle = (areaId, value) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === areaId ? { ...area, title: value } : area
      )
    );
  };

  // 아이템 추가/수정/삭제
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
          ? { ...area, items: area.items.filter((item) => item.id !== itemId) }
          : area
      )
    );
  };

  // 드래그 시 필요한 정보 찾기
  const findItem = (id) => {
    for (const area of areas) {
      const found = area.items.find((item) => `${area.id}:${item.id}` === id);
      if (found) return { ...found, areaId: area.id };
    }
    return null;
  };

  // 드래그 시작
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(findItem(active.id));
  };

  // 드래그 종료(빈 area 드롭도 지원)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over || active.id === over.id) return;

    const [fromAreaId, fromItemId] = active.id.split(":");

    // 1) 빈 Area로 드롭
    if (over.id.startsWith("empty-area-")) {
      const toAreaId = over.id.replace("empty-area-", "");
      setAreas((prev) => {
        let movedItem = null;
        // 원래 위치에서 삭제
        const updated = prev.map((area) => {
          if (area.id === fromAreaId) {
            const idx = area.items.findIndex((item) => item.id === fromItemId);
            if (idx > -1) {
              movedItem = area.items[idx];
              return {
                ...area,
                items: [
                  ...area.items.slice(0, idx),
                  ...area.items.slice(idx + 1),
                ],
              };
            }
          }
          return area;
        });
        // 빈 area에 맨 뒤로 추가
        return updated.map((area) =>
          area.id === toAreaId && movedItem
            ? { ...area, items: [...area.items, movedItem] }
            : area
        );
      });
      return;
    }

    // 2) 기존 아이템 위치로 드롭
    const [toAreaId, toItemId] = over.id.split(":");
    setAreas((prev) => {
      let movedItem = null;
      // 원래 위치에서 삭제
      const updated = prev.map((area) => {
        if (area.id === fromAreaId) {
          const idx = area.items.findIndex((item) => item.id === fromItemId);
          if (idx > -1) {
            movedItem = area.items[idx];
            return {
              ...area,
              items: [
                ...area.items.slice(0, idx),
                ...area.items.slice(idx + 1),
              ],
            };
          }
        }
        return area;
      });
      // 새 위치에 추가
      return updated.map((area) => {
        if (area.id === toAreaId && movedItem) {
          const idx = area.items.findIndex((item) => item.id === toItemId);
          const insertAt = idx >= 0 ? idx : area.items.length;
          const newItems = [...area.items];
          newItems.splice(insertAt, 0, movedItem);
          return { ...area, items: newItems };
        }
        return area;
      });
    });
  };

  return (
    <>
      <button onClick={handleAddArea} className="addAreaBtn">
        + Add Section
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="midArea" style={{ display: "flex", gap: 20 }}>
          {areas.map((area) => (
            <div
              className="itemArea"
              key={area.id}
              style={{
                minWidth: 240,
                background: "#f3f4f6",
                borderRadius: 10,
                padding: 16,
                boxShadow: "0 2px 8px #ddd",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="itemtop" style={{ display: "flex", gap: 6 }}>
                <input
                  type="text"
                  value={area.title}
                  onChange={(e) => handleEditTitle(area.id, e.target.value)}
                  style={{
                    flex: 1,
                    fontWeight: "bold",
                    background: "none",
                    border: "none",
                    borderBottom: "1.5px solid #bbb",
                    fontSize: 17,
                  }}
                />
                <button onClick={() => handleDeleteArea(area.id)}>X</button>
              </div>

              <SortableContext
                items={area.items.map((item) => `${area.id}:${item.id}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="itemList" style={{ flex: 1, marginTop: 10 }}>
                  {area.items.length === 0 ? (
                    <EmptyDropZone areaId={area.id} />
                  ) : (
                    area.items.map((item) => (
                      <SortableItem
                        key={item.id}
                        id={`${area.id}:${item.id}`}
                        areaId={area.id}
                        text={item.text}
                        onEdit={handleEditItem}
                        onDelete={handleDeleteItem}
                      />
                    ))
                  )}
                </div>
              </SortableContext>

              <div className="itembot" style={{ marginTop: 8 }}>
                <button
                  onClick={() => handleAddItem(area.id)}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "#fff",
                    borderRadius: 6,
                    padding: "6px 0",
                    fontWeight: 600,
                    boxShadow: "0 2px 4px #eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/images/Plusblack.svg"
                    alt="plus"
                    style={{ width: 16 }}
                  />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "6px",
                background: "#ddd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                minWidth: 120,
              }}
            >
              {activeItem.text || "Dragging"}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};
