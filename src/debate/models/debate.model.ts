export interface Debate {
  id: string; // DebateId
  name: string; // 방제목
  participants: string[]; // 참여 유저 ID 배열
  maxParticipants: number; // 참여 인원수
  isPublic: boolean; // 공개 여부
  password?: string; // 비밀번호
  topic: string; // 토론 주제
}
