import { db } from "./db";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  // Find or create conversation
  const conversation = await findConversation(memberOneId, memberTwoId);

  // Create a new conversation if none is found
  if (!conversation) {
    return await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        OR: [
          {
            AND: [
              { memberOneId },
              { memberTwoId },
            ],
          },
          {
            AND: [
              { memberOneId: memberTwoId },
              { memberTwoId: memberOneId },
            ],
          },
        ],
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error finding conversation:", error);
    return null;
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return null;
  }
};
