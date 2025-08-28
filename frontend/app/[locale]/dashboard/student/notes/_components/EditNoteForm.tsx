import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, X } from "lucide-react";
import { Editor } from "primereact/editor";
import { useState } from "react";

const EditNoteForm = ({
    note,
    handleCreateNote,
    handleEditNote,
    setToggleVisibility,
}: {
    note?: NotesType;
    handleCreateNote: (note: NotesType) => void;
    handleEditNote: (note: NotesType) => void;
    setToggleVisibility: (editing: boolean) => void;
}) => {
    const [currentNote, setCurrentNote] = useState<NotesType | null>({
        id: note?.id ? note.id : "",
        title: note?.title ? note.title : "",
        category: note?.category ? note.category : "",
        content: note?.content ? note.content : "",
        color: note?.color ? note.color : "",
        created_at: note?.created_at ? note.created_at : "",
    });

    // Check if there are any changes done to the note
    const hasChanges =
        note?.title !== currentNote?.title ||
        note?.category !== currentNote?.category ||
        note?.content !== currentNote?.content ||
        note?.color !== currentNote?.color;

    return (
        <div className="rounded-2xl border p-6">
            {/* Header of the form */}
            <header className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    {note ? "Edit Note" : "Create Note"}
                </h2>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setToggleVisibility(false)}
                >
                    <X />
                </Button>
            </header>
            {/* Main content of the note here */}
            <main>
                <form className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="title">
                            Title
                        </Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter title"
                            value={currentNote?.title}
                            onChange={(e) =>
                                setCurrentNote({
                                    ...(currentNote as NotesType),
                                    title: e.target.value as string,
                                })
                            }
                        />
                    </div>
                    {/* Category */}
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="category">
                            Category
                        </Label>
                        <Input
                            type="text"
                            name="category"
                            id="category"
                            placeholder="Enter category"
                            value={currentNote?.category}
                            onChange={(e) =>
                                setCurrentNote({
                                    ...(currentNote as NotesType),
                                    category: e.target.value as string,
                                })
                            }
                        />
                    </div>
                    {/* Color */}
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="color">
                            Color
                        </Label>
                        <ul className="flex flex-wrap gap-2">
                            <li>
                                <div
                                    onClick={() =>
                                        setCurrentNote({
                                            ...(currentNote as NotesType),
                                            color: "red",
                                        })
                                    }
                                    className={`h-10 w-10 rounded-full bg-red-200 ${
                                        currentNote?.color === "red"
                                            ? "ring-1 ring-red-500 ring-offset-2"
                                            : ""
                                    }`}
                                ></div>
                            </li>
                            <li>
                                <div
                                    onClick={() =>
                                        setCurrentNote({
                                            ...(currentNote as NotesType),
                                            color: "blue",
                                        })
                                    }
                                    className={`h-10 w-10 rounded-full bg-blue-200 ${
                                        currentNote?.color === "blue"
                                            ? "ring-1 ring-blue-500 ring-offset-2"
                                            : ""
                                    }`}
                                ></div>
                            </li>
                            <li>
                                <div
                                    onClick={() =>
                                        setCurrentNote({
                                            ...(currentNote as NotesType),
                                            color: "green",
                                        })
                                    }
                                    className={`h-10 w-10 rounded-full bg-green-200 ${
                                        currentNote?.color === "green"
                                            ? "ring-1 ring-green-500 ring-offset-2"
                                            : ""
                                    }`}
                                ></div>
                            </li>
                            <li>
                                <div
                                    onClick={() =>
                                        setCurrentNote({
                                            ...(currentNote as NotesType),
                                            color: "yellow",
                                        })
                                    }
                                    className={`h-10 w-10 rounded-full bg-yellow-200 ${
                                        currentNote?.color === "yellow"
                                            ? "ring-1 ring-yellow-500 ring-offset-2"
                                            : ""
                                    }`}
                                ></div>
                            </li>
                            <li>
                                <div
                                    onClick={() =>
                                        setCurrentNote({
                                            ...(currentNote as NotesType),
                                            color: "purple",
                                        })
                                    }
                                    className={`h-10 w-10 rounded-full bg-purple-200 ${
                                        currentNote?.color === "purple"
                                            ? "ring-1 ring-purple-500 ring-offset-2"
                                            : ""
                                    }`}
                                ></div>
                            </li>
                        </ul>
                    </div>
                    {/* Content */}
                    <div className="input-group">
                        <Label className="mb-2" htmlFor="content">
                            Content
                        </Label>
                        <Editor
                            value={currentNote?.content}
                            onTextChange={(e) =>
                                setCurrentNote({
                                    ...(currentNote as NotesType),
                                    content: e.htmlValue as string,
                                })
                            }
                            style={{ height: "320px" }}
                        />
                    </div>
                </form>
            </main>
            {/* Action Buttons */}
            <footer className="mt-6 flex items-center justify-end gap-2">
                <Button
                    type="submit"
                    disabled={!hasChanges}
                    onClick={() => {
                        if (note) {
                            handleEditNote(currentNote as NotesType);
                        } else {
                            handleCreateNote(currentNote as NotesType);
                        }
                        setToggleVisibility(false);
                    }}
                    className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {note ? (
                        <>
                            <Save /> Save Changes
                        </>
                    ) : (
                        <>
                            <Plus /> Create Note
                        </>
                    )}
                </Button>
                <Button
                    onClick={() => setToggleVisibility(false)}
                    variant="outline"
                >
                    <X /> Cancel
                </Button>
            </footer>
        </div>
    );
};

export default EditNoteForm;
