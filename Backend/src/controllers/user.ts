import { RequestHandler } from "express";
import { prisma } from "..";

export const followUser: RequestHandler = async (req, res, next) => {
  const { id } = req.body;
  try {
    await prisma.user.update({
      where: { id },
      data: {
        followedBy: {
          connect: [{ id: req.user.id }],
        },
      },
    });

    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
};

export const unfollowUser: RequestHandler = async (req, res, next) => {
  const { id } = req.body;
  try {
    await prisma.user.update({
      where: { id },
      data: {
        followedBy: {
          disconnect: [{ id: req.user.id }],
        },
      },
    });
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
  }
};

export const getProfile: RequestHandler = async (req, res, next) => {
  const { username } = req.query;
  const profile = await prisma.user.findUnique({
    where: { username: username as string },
    select: {
      id: true,
      username: true,
      createdAt: true,
      bio: true,
      pfp: true,
      _count: {
        select: {
          followedBy: true,
          following: true,
          twits: true,
        },
      },
      followedBy: {
        take: 1,
        where: { id: req.user.id },
        select: {
          id: true,
        },
      },
    },
  });
  if (!profile) {
    res.status(400).send();
    return;
  }
  console.log(profile);
  const isFollowing = profile.followedBy.length > 0;

  res.status(200).json({
    id: profile.id,
    username: profile.username,
    createdAt: profile.createdAt,
    bio: profile.bio,
    pfp: profile.pfp,
    followedBy: profile._count?.followedBy,
    following: profile._count?.following,
    twitAmount: profile._count?.twits,
    isFollowing,
  });
};

export const getUserTwits: RequestHandler = async (req, res, next) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    res.status(400);
    return;
  }
  try {
    const twits = await prisma.twit.findMany({
      where: { authorId: +id },
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

export const getUserLikes: RequestHandler = async (req, res, next) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    res.status(400);
    return;
  }
  try {
    const twits = await prisma.twit.findMany({
      where: { likes: { some: { userId: +id } } },
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

export const findUser: RequestHandler = async (req, res, next) => {
  const { match } = req.query;
  if (typeof match !== "string") {
    res.status(400);
    return;
  }

  const users = await prisma.user.findMany({
    where: { username: { contains: match } },
    include: {
      _count: {
        select: {
          followedBy: true,
          following: true,
        },
      },
    },
  });

  res
    .status(200)
    .send(users.map((u) => ({ ...u, ...u._count, _count: undefined })));
};
