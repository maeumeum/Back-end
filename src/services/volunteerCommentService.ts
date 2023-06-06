import { VolunteerCommentModel } from '../db/index.js';
import { ObjectId } from 'mongodb';
import { Volunteer } from '../db/schemas/volunteerSchema.js';
import { DateTime } from 'luxon';

interface VolunteerCommentData {
  volunteer_id: ObjectId | string | null;
  user_id: ObjectId | string | null;
  content: string;
  createdAt: Date;
}
class VolunteerCommentService {
  static async createComment(volunteerComment: VolunteerCommentData) {
    const comment = await VolunteerCommentModel.create(volunteerComment);

    if (!comment) {
      throw new Error('댓글 작성에 실패하였습니다.');
    }

    return true;
  }

  static async readVolunteerByComment(user_id: ObjectId) {
    const userComments = await VolunteerCommentModel.find({ user_id }).populate(
      'volunteer_id',
      ['title', 'content']
    );

    if (userComments.length === 0) {
      return false;
    }

    const volunteerList = userComments.map((userComment) => {
      const volunteerId = userComment.volunteer_id as Volunteer;
      const userCommentObj = userComment.toObject() as VolunteerCommentData;
      const createdAt = userCommentObj.createdAt;

      const volunteerCommentSavedTime = DateTime.fromJSDate(createdAt);

      return {
        title: volunteerId.title,
        content: volunteerId.content,
        createdAt: volunteerCommentSavedTime,
        postType: '봉사모집하기',
      };
    });

    return volunteerList;
  }

  static async readPostComment(volunteerId: string) {
    const commentList = await VolunteerCommentModel.find({
      volunteer_id: volunteerId,
    });

    if (!commentList) {
      throw new Error('댓글 조회를 실패하였습니다.');
    }

    return commentList;
  }

  static async updateComment(
    volunteerCommentId: string,
    volunteerCommentData: VolunteerCommentData
  ) {
    const newComment = await VolunteerCommentModel.findByIdAndUpdate(
      volunteerCommentId,
      volunteerCommentData
    );

    if (!newComment) {
      throw new Error('댓글 수정에 실패햐였습니다.');
    }

    return true;
  }

  static async deleteComment(volunteerCommentId: string) {
    const comment = await VolunteerCommentModel.findByIdAndDelete(
      volunteerCommentId
    );

    if (!comment) {
      throw new Error('댓글 삭제에 실패하였습니다.');
    }

    return true;
  }
}

export { VolunteerCommentService };