import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CommentCreateInput, CommentUpdateInput } from './inputs/comment.input';
import { Role } from 'prisma/generated/prisma/enums';

@Injectable()
export class ReactionService {
  constructor(private readonly prisma: PrismaService) {}

  async findComment(commentId: string, userId: string, userRole: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || (comment.authorId !== userId && userRole !== Role.ADMIN)) {
      throw new ForbiddenException('Comment not found or unauthorized');
    }

    return comment;
  }

  async toggleLike(userId: string, recipeId: string) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        recipeId_userId: {
          recipeId,
          userId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { liked: false };
    } else {
      await this.prisma.like.create({
        data: {
          user: {
            connect: { id: userId },
          },
          recipe: {
            connect: { id: recipeId },
          },
        },
      });
      return { liked: true };
    }
  }

  createComment(userId: string, input: CommentCreateInput) {
    return this.prisma.comment.create({
      data: {
        author: {
          connect: { id: userId },
        },
        content: input.content,
        recipe: {
          connect: { id: input.recipeId },
        },
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async updateComment(
    userId: string,
    userRole: Role,
    commentId: string,
    input: CommentUpdateInput,
  ) {
    const comment = await this.findComment(commentId, userId, userRole);

    return this.prisma.comment.update({
      where: { id: comment.id },
      data: {
        content: input.content,
      },
      include: {
        author: true,
      },
    });
  }

  async deleteComment(userId: string, userRole: Role, commentId: string) {
    const comment = await this.findComment(commentId, userId, userRole);

    await this.prisma.comment.delete({ where: { id: comment.id } });
    return true;
  }
}
