"use client";

import { Button } from "@/components/ui/button";
import { createNote, deleteNote, editNote, getAllNotes } from "@/lib/api/notes";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import NoteCard from "./_components/NoteCard";
import EditNoteForm from "./_components/EditNoteForm";

const NotesPage = () => {
    const [notes, setNotes] = useState<NotesType[]>([]);
    const [note, setNote] = useState<NotesType | null>(null);
    const [toggleVisibility, setToggleVisibility] = useState(false);

    // Handle List All Notess
    useEffect(() => {
        getAllNotes().then((data) => {
            setNotes(data);
        });
    }, [setNotes]);

    // Handle Create Note
    const handleCreateNote = (note: NotesType) => {
        // API CREATE METHOD NOTE
        createNote(note as NotesType);
        // Refresh page
        window.location.reload();

        setToggleVisibility(false);
    };

    const handleCreateNoteClick = () => {
        setNote(null);
        setToggleVisibility(true);
    };

    // Handle Edit Note
    const handleEditNote = (note: NotesType) => {
        setNote(null);
        editNote(note as NotesType);
        window.location.reload();

        setToggleVisibility(true);
    };

    // Handle Edit Note Click
    const handleEditNoteClick = (note: NotesType) => {
        setNote(note as NotesType);
        setToggleVisibility(true);
    };

    // Handle Delete Note
    const handleDeleteNote = (id: string) => {
        deleteNote(id);
        window.location.reload();
    };

    return (
        <section className="flex flex-col gap-6">
            <header className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Notes</h1>
                {!toggleVisibility && (
                    <Button
                        onClick={handleCreateNoteClick}
                        className="flex items-center gap-2 text-white"
                    >
                        <Plus /> Create Note
                    </Button>
                )}
            </header>
            {notes.length > 0 ? (
                <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note: NotesType) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            handleEditNoteClick={handleEditNoteClick}
                            handleDeleteNote={handleDeleteNote}
                        />
                    ))}
                </main>
            ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed">
                    <p className="text-lg text-gray-500">No Notes</p>
                </div>
            )}
            <hr />
            {toggleVisibility && (
                <EditNoteForm
                    note={note as NotesType}
                    handleCreateNote={handleCreateNote}
                    handleEditNote={handleEditNote}
                    setToggleVisibility={setToggleVisibility}
                />
            )}
        </section>
    );
};

export default NotesPage;
