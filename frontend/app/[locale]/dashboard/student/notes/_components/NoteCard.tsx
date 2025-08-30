import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { format } from "timeago.js";

const colorMap: { [key: string]: string } = {
    red: "bg-red-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
};

const NoteCard = ({
    note,
    handleEditNoteClick,
    handleDeleteNote,
}: {
    note: NotesType;
    handleEditNoteClick: (note: NotesType) => void;
    handleDeleteNote: (id: string) => void;
}) => {
    const { id, title, category, content, color, created_at } = note;

    return (
        <div
            className={cn(
                "flex flex-col rounded-2xl border p-6 dark:text-black",
                colorMap[color],
            )}
        >
            <h2 className="text-xl font-semibold">{title || "Untitled"}</h2>
            <p className="text-sm text-gray-500">
                {category} | Created {format(created_at)}
            </p>
            <div
                className="prose mt-4 line-clamp-2 flex-grow"
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
            <div className="mt-4 flex items-center justify-end gap-2 border-t pt-4">
                <Button
                    onClick={() => handleEditNoteClick(note)}
                    variant="ghost"
                    size="icon"
                >
                    <Edit className="h-5 w-5" />
                </Button>
                <Button
                    onClick={() => handleDeleteNote(id as string)}
                    variant="ghost"
                    size="icon"
                >
                    <Trash className="h-5 w-5 text-red-500" />
                </Button>
            </div>
        </div>
    );
};

export default NoteCard;
