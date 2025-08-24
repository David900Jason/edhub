"use client";

import { Button } from "@/components/ui/button";
import { getAllNotes } from "@/lib/api/notes";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import NoteCard from "./_components/NoteCard";

const NotesPage = () => {
    const [notes, setNotes] = useState<NotesType[]>([]);

    // Handle List All Notess
    useEffect(() => {
        getAllNotes().then((data) => {
            setNotes(data);
        });
    }, [getAllNotes]);

    // Handle Create Note

    // Handle Edit Save Note

    // Handle Editing Note

    // Handle Delete Note

    return (
        <section>
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-semibold">Notes</h1>
                <Button
                    className="flex items-center gap-2 text-white"
                    onClick={() => {}}
                >
                    <Plus /> Create Note
                </Button>
            </header>
            {notes.length > 0 ? (
                <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note: NotesType) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
                </main>
            ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed">
                    <p className="text-lg text-gray-500">No Notes</p>
                </div>
            )}

            {/* Create Note */}

            {/* Edit Note */}

            {/* {toggleVisibility && (
                <footer className="mt-12 flex flex-col gap-6 rounded-2xl border p-6">
                    <div className="flex flex-1 items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {editingNote ? t("edit_note") : t("write_new_note")}
                        </h2>
                        <X className="cursor-pointer" onClick={handleCancel} />
                    </div>
                    <div className="input-group">
                        <Label className="mb-2">{t("new_note_title")}</Label>
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
                        <Label className="mb-2">{t("new_note_category")}</Label>
                        <Select
                            value={newNote.category}
                            onValueChange={(value) => {
                                setNewNote({ ...newNote, category: value });
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={t("new_note_category")}
                                />
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
                        <Label className="mb-2">{t("new_note_color")}</Label>
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
                        <Label className="mb-2">{t("new_note_content")}</Label>
                        <Editor
                            dir="ltr"
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
                        className={
                            locale === "ar"
                                ? "mr-auto text-white"
                                : "ml-auto text-white"
                        }
                        onClick={handleSaveNote}
                    >
                        <Check />{" "}
                        {editingNote ? t("edit_note") : t("new_note_cta")}
                    </Button>
                </footer>
            )} */}
        </section>
    );
};

export default NotesPage;
