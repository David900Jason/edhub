"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn, generateId } from "@/lib/utils";
import axios from "axios";
import { Check, Edit, Plus, Trash, X } from "lucide-react";
import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const colorMap: { [key: string]: string } = {
    red: "bg-red-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
};

interface NoteType {
    id: string;
    title: string;
    category: string;
    content: string;
    color: string;
    created_at: string;
}

const NotesPage = () => {
    const [user] = useLocalStorage("user", null);

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [toggleVisibility, setToggleVisibility] = useState(false);
    const [editingNote, setEditingNote] = useState<NoteType | null>(null); // Track the note being edited
    const [newNote, setNewNote] = useState({
        title: "",
        category: "",
        content: "",
        color: "red", // Default color
    });

    useEffect(() => {
        const fetchAllCategoriesFromCourses = async () => {
            const response = await fetch("http://localhost:8000/courses");
            const data = await response.json();
            const categories = data.map((course: CourseType) => course.category);
            const uniqueCategories = [...new Set(categories)];
            setCategories(uniqueCategories as string[]);
        };
        const fetchAllNotes = async () => {
            if (user && user.notes_id) {
                const response = await fetch(
                    `http://localhost:8000/notes/${user.notes_id}`,
                );
                const data = await response.json();
                setNotes(
                    data.notes.sort(
                        (a: NoteType, b: NoteType) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime(),
                    ),
                );
            }
        };
        fetchAllCategoriesFromCourses();
        fetchAllNotes();
    }, [user]);

    // Set form for editing an existing note
    const handleEditClick = (note: NoteType) => {
        setEditingNote(note);
        setNewNote({
            title: note.title,
            category: note.category,
            content: note.content,
            color: note.color,
        });
        setToggleVisibility(true);
    };

    // Reset form and hide it
    const handleCancel = () => {
        setEditingNote(null);
        setNewNote({
            title: "",
            category: "",
            content: "",
            color: "red",
        });
        setToggleVisibility(false);
    };

    // Handles both creating and updating notes
    const handleSaveNote = async () => {
        if (
            !newNote.title.trim() ||
            !newNote.content.trim() ||
            !newNote.category
        ) {
            return; // Basic validation
        }

        let updatedNotes;

        if (editingNote) {
            // Update existing note
            updatedNotes = notes.map((note: NoteType) =>
                note.id === editingNote.id ? { ...note, ...newNote } : note,
            );
        } else {
            // Add new note
            updatedNotes = [
                ...notes,
                {
                    id: generateId(4),
                    ...newNote,
                    created_at: new Date().toISOString(),
                },
            ];
        }

        try {
            await axios.patch(`http://localhost:8000/notes/${user.notes_id}`, {
                notes: updatedNotes,
            });

            setNotes(updatedNotes); // Immediately update the UI with the new data
            handleCancel(); // Reset state and hide form
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteNote = async (noteId: string) => {
        try {
            const updatedNotes = notes.filter(
                (note: NoteType) => note.id !== noteId,
            );
            await axios.patch(`http://localhost:8000/notes/${user.notes_id}`, {
                notes: updatedNotes,
            });
            setNotes(updatedNotes); // Optimistic UI update
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">My Notes</h1>
                {toggleVisibility == false && (
                    <Button
                        className="flex items-center gap-2 text-white"
                        onClick={() => {
                            setEditingNote(null); // Ensure we are in 'create' mode
                            setToggleVisibility(true);
                        }}
                    >
                        <Plus /> New Note
                    </Button>
                )}
            </header>
            {notes.length > 0 ? (
                <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note: NoteType) => (
                        <div
                            key={note.id}
                            className={cn(
                                "flex flex-col rounded-2xl border p-6 dark:text-black",
                                colorMap[note.color],
                            )}
                        >
                            <h2 className="text-xl font-semibold">
                                {note.title}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {note.category} | Created{" "}
                                {format(note.created_at)}
                            </p>
                            <div
                                className="prose mt-4 flex-grow"
                                dangerouslySetInnerHTML={{
                                    __html: note.content,
                                }}
                            />
                            <div className="mt-4 flex items-center justify-end gap-2 border-t pt-4">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditClick(note)}
                                >
                                    <Edit className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteNote(note.id)}
                                >
                                    <Trash className="h-5 w-5 text-red-500" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </main>
            ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed">
                    <p className="text-lg text-gray-500">No notes yet.</p>
                </div>
            )}

            {toggleVisibility && (
                <footer className="mt-12 flex flex-col gap-6 rounded-2xl border p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {editingNote ? "Edit Note" : "Write new Note"}
                        </h2>
                        <X
                            className="ml-auto cursor-pointer"
                            onClick={handleCancel}
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Title</Label>
                        <Input
                            value={newNote.title}
                            onChange={(e) => {
                                setNewNote({
                                    ...newNote,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Category</Label>
                        <Select
                            value={newNote.category}
                            onValueChange={(value) => {
                                setNewNote({ ...newNote, category: value });
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Color</Label>
                        <div className="flex gap-2">
                            {Object.keys(colorMap).map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={cn(
                                        `h-8 w-8 rounded-full border-2`,
                                        `bg-${color}-200`,
                                        newNote.color === color
                                            ? "border-blue-500"
                                            : "border-transparent",
                                    )}
                                    onClick={() =>
                                        setNewNote({ ...newNote, color })
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">Content</Label>
                        <Editor
                            value={newNote.content}
                            onTextChange={(e) => {
                                setNewNote({
                                    ...newNote,
                                    content: e.htmlValue || "",
                                });
                            }}
                            style={{ height: "250px" }}
                        />
                    </div>
                    <Button
                        className="ml-auto text-white"
                        onClick={handleSaveNote}
                    >
                        <Check /> {editingNote ? "Save Changes" : "Save Note"}
                    </Button>
                </footer>
            )}
        </section>
    );
};

export default NotesPage;
