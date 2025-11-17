# Node 22 기반 이미지 사용
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 앱 소스 복사
COPY . .

# NestJS 빌드
RUN npm run build

# 실제 실행용 경량 이미지
FROM node:22-alpine

WORKDIR /app

# production 의존성만 설치
COPY package*.json ./
RUN npm ci --only=production

# 빌드된 파일 복사
COPY --from=builder /app/dist ./dist

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "dist/main.js"]
