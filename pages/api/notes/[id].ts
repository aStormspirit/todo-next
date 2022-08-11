import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const noteId = req.query.id

    if(req.method === 'DELETE'){
        const note = await prisma.note.delete({
            where: {id: Number(noteId)}
        })
        res.json(note)
    }else if(req.method === 'PATCH'){
        const { title, content } = req.body

        const note = await prisma.note.update({
            where: {id: Number(noteId)},
            data: {title: title, content: content}
        })
        res.json(note)
    }
}