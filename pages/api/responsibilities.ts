import { computeNextResponsibilitiesForUsers } from '../../src/services/responsibilities';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

type Data = {
  success: boolean;
  data: any[];
  error?: string;
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { APP_KEY } = process.env;
  const [_, ACTION_KEY] = req.headers.authorization?.split(' ') || [];
  console.log(ACTION_KEY);
  try {
    if (ACTION_KEY === APP_KEY) {
      // TODO: abstract this part and make a DTO
      const users = await prisma.user.findMany();
      const categories = await prisma.category.findMany();
      const previousResponsibilities = await prisma.responsibility.findMany();
      const responsibilities = computeNextResponsibilitiesForUsers(
        previousResponsibilities,
        users,
        categories
      );
      const updatePromises = responsibilities.map((responsibility) =>
        prisma.responsibility.update({
          where: {
            id: responsibility.id
          },
          data: {
            lastAffectDate: responsibility.lastAffectDate
          }
        })
      );
      const responses = await Promise.all(updatePromises);
      console.log(responses);
      return res.status(200).json({ success: true, data: responsibilities });
    } else {
      return res.status(401).json({ success: false, data: [] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, data: [] });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return handlePostRequest(req, res);
    default:
      return res.status(405);
  }
}
