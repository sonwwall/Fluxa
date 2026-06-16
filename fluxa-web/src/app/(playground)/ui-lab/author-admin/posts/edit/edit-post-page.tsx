import { AdminSidebar } from "../../admin-sidebar";
import { AdminTopbar } from "../../admin-topbar";
import { EditorHeader } from "./editor-header";
import { EditorSidePanel } from "./editor-side-panel";
import { MarkdownEditorPanel } from "./markdown-editor-panel";
import { PostMetaForm } from "./post-meta-form";

export function EditPostPage() {
  return (
    <main className="dark min-h-screen bg-[#040b18] text-white">
      <div className="flex">
        <AdminSidebar active="Posts" />
        <section className="min-w-0 flex-1">
          <AdminTopbar
            breadcrumb={["Dashboard", "Posts", "Edit Post"]}
            searchPlaceholder="Search..."
          />
          <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_390px] lg:p-8">
            <div className="flex min-w-0 flex-col gap-5">
              <EditorHeader />
              <PostMetaForm />
              <MarkdownEditorPanel />
            </div>
            <EditorSidePanel />
          </div>
        </section>
      </div>
    </main>
  );
}
