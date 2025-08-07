import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function TableDemo({ data }: { data?: object[] }) {
    return (
        <Table className="mt-6 p-4 border rounded-lg">
            <TableHeader>
                <TableRow className="bg-gray-100">
                    {data && data.length > 0 ? (
                        Object.keys(data[0]).map((key) => (
                            <TableHead key={key} className="text-left capitalize">
                                {key}
                            </TableHead>
                        ))
                    ) : (
                        <TableHead className="text-center">No Data</TableHead>
                    )}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.length > 0 ? (
                    data?.map((datum: object, index: number) => (
                        <TableRow key={index}>
                            {Object.entries(datum).map(([key, value]) => (
                                <TableCell key={key} className="text-left">
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                    <p>No Data Provided</p>
                )}
            </TableBody>
        </Table>
    );
}
