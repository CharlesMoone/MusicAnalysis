export async function loadWebAssembly (path, imports = {}) {
  const response = await fetch(path);
  const buffer = await response.arrayBuffer();
  const module = await WebAssembly.compile(buffer);

  imports.env = imports.env || {};
  imports.env.memoryBase = imports.env.memoryBase || 0;
  !imports.env.memory && (imports.env.memory = new WebAssembly.Memory({ initial: 256 }));
  imports.env.tableBase = imports.env.tableBase || 0;
  !imports.env.table && (imports.env.table = new WebAssembly.Table({ initial: 0, element: 'anyfunc'}));

  return new WebAssembly.Instance(module, imports);
}