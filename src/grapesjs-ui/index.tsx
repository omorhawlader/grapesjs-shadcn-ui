import { useRef } from "react";
import grapesjs, { Editor } from "grapesjs";
import GjsEditor, { Canvas } from "@grapesjs/react";
import { RightPanel } from "./right-panel";
import { TopControllers } from "./top-controllers";
import options from "./options";
import { default as customOnEditor } from "./on-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui";
import { LeftPanel } from "./left-panel";

export const GrapesjsUI = () => {
  const editorRef = useRef<Editor | null>(null);

  const onEditor = async (editor: Editor) => {
    if (!editor) {
      console.error("Editor is not initialized");
      return;
    }
    editorRef.current = editor;

    return customOnEditor(editor);
  };

  return (
    <div>
      <GjsEditor
        className="gjs-custom-editor"
        // Pass the core GrapesJS library to the wrapper (required).
        // You can also pass the CDN url (eg. "https://unpkg.com/grapesjs")
        grapesjs={grapesjs}
        // Load the GrapesJS CSS file asynchronously from URL.
        // This is an optional prop, you can always import the CSS directly in your JS if you wish.
        grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css" // css cdn
        // GrapesJS init options
        options={options(editorRef)}
        onEditor={onEditor}
      >
        {/* <div className="flex h-screen overflow-hidden">
          <LeftPanel />
          <section className="flex-1 flex flex-col">
            <TopControllers />
            <Canvas className="bg-slate-200 p-2 2xl:p-4" />
          </section>
          <ScrollArea className="w-60 bg-slate-50 border-l">
            <RightPanel />
          </ScrollArea>
        </div> */}

        <ResizablePanelGroup
          direction="horizontal"
          className="flex h-screen overflow-hidden"
        >
          {/* Start Left Panel */}
          <ResizablePanel
            defaultSize={10}
            minSize={8}
            className="w-[200px] h-full bg-white"
          >
            <LeftPanel />
          </ResizablePanel>
          <ResizableHandle withHandle />
          {/* end Left Panel */}

          {/* Start Middle Area */}
          <ResizablePanel minSize={30} className="flex-1 h-full">
            <header>
              <TopControllers />
            </header>
            <main className="h-full">
              <Canvas className="bg-slate-200 border-b-[42px] border-transparent" />
            </main>
          </ResizablePanel>
          {/* End Middle Area */}

          {/* Start Right Panel */}
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={10}
            minSize={8}
            className="w-[200px] h-full bg-white"
          >
            <RightPanel />
          </ResizablePanel>
          {/* End Right Panel */}
        </ResizablePanelGroup>
      </GjsEditor>
    </div>
  );
};
