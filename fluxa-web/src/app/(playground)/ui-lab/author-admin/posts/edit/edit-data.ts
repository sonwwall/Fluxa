export const editorMarkdown = `# 构建一个现代化的 Go 微服务架构实践

在云原生和 DevOps 成为主流的今天，微服务架构已经成为构建可扩展、高可用应用的首选方案。Go 语言凭借其高性能、并发模型和丰富的生态，非常适合用于构建微服务。

## 为什么选择 Go？

- 高性能：编译型语言，执行效率接近 C/C++
- 并发友好：Goroutine + Channel 让并发编程变得简单
- 轻量部署：静态编译，部署镜像小
- 丰富生态：gRPC、Kitex、Kratos 等框架成熟稳定

## 架构设计原则

在设计微服务架构时，我们遵循以下几个核心原则：

1. 单一职责：每个服务只负责一个业务领域
2. 松耦合：服务之间通过清晰的接口通信
3. 可观测性：日志、指标、链路追踪三位一体
4. 可扩展性：支持水平扩展和弹性伸缩

### 服务通信：gRPC 示例

我们使用 gRPC 作为服务间的主要通信协议，定义如下 proto 文件：

\`\`\`proto
syntax = "proto3";
package user.v1;
option go_package = "user/v1;userv1";
\`\`\`
`;

export const editorTags = ["Go", "微服务", "架构"];
