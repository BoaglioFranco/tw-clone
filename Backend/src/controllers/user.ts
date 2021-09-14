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
  const { id } = req.body;
  const profile = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      createdAt: true,
      bio: true,
      _count: {
        select: {
          followedBy: true,
          following: true,
          twits: true,
        },
      },
    },
  });
  if (!profile) {
    res.status(400).send();
    return;
  }

  res.status(200).json({
    id: profile.id,
    username: profile.username,
    createdAt: profile.createdAt,
    bio: profile.bio,
    followedBy: profile._count?.followedBy,
    following: profile._count?.following,
    twitAmount: profile._count?.twits,
  });
};

export const getUserTwits: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const twits = await prisma.twit.findMany({
    where: { authorId: +id },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });
  res.status(200).json(twits) //TODO: MAPEAR TWITS, AGREGAR USER
};