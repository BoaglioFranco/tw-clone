import { prisma } from "..";
import { RequestHandler } from "express";

export const createTwit: RequestHandler = async (req, res, next) => {
  const { text } = req.body;
  try {
    const twit = await prisma.twit.create({
      data: {
        text,
        author: {
          connect: {
            id: req.user.id,
          },
        },
      },
      include: {
        author: {
          select: {
            username: true,
            pfp: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    const response = { ...twit, ...twit._count, _count: undefined };
    console.log("rsp", response);
    res.status(201).json(response);
  } catch (e) {
    res.status(400).send();
  }
};

export const getTwits: RequestHandler = async (req, res, next) => {
  try {
    const twits = await prisma.twit.findMany({
      include: {
        author: {
          select: {
            username: true,
            pfp: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: req.user.id,
          },
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(
      twits.map((t) => ({
        ...t,
        hasLiked: t.likes.length > 0,
        likes: t._count?.likes,
        _count: undefined,
      }))
    );
  } catch (e) {
    res.status(400).send();
  }
};

export const likeTwit: RequestHandler = async (req, res, next) => {
  const { id } = req.body;
  try {
    const like = await prisma.like.findUnique({
      where: { userId_twitId: { userId: req.user.id, twitId: id } },
    });
    if (!like) {
      await prisma.like.create({
        data: {
          userId: req.user.id,
          twitId: id,
        },
      });
    } else {
      await prisma.like.delete({
        where: { userId_twitId: { userId: req.user.id, twitId: id } },
      });
    }

    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
};

export const findTwits: RequestHandler = async (req, res, next) => {
  const { match } = req.query;
  if (typeof match !== "string") {
    res.status(400).send();
    return;
  }
  const twits = await prisma.twit.findMany({
    where: {
      text: { contains: match },
    },
    include: {
      author: {
        select: {
          username: true,
          pfp: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        where: {
          userId: req.user.id,
        },
        select: {
          userId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(
    twits.map((t) => ({
      ...t,
      hasLiked: t.likes.length > 0,
      likes: t._count?.likes,
      _count: undefined,
    }))
  );
};
