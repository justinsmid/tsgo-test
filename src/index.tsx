import React from "react";
import { createRoot } from "react-dom/client";
import { FooPage } from "./components/Foo";

const root = createRoot(document.getElementById("root")!);
root.render(<FooPage />);