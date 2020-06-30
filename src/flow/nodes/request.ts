import FlowNode from "../core/FlowNode";
class RequestNode extends FlowNode {
  init(options: any) {
    console.log(options, "ff");
    const { url } = options;
    this.on("input", msg => {
      fetch(url, {
        headers: new Headers({
          "x-api-key": "afc10d92-676a-4d10-87ce-7ce2076a37fe"
        })
      })
        .then(response => response.json())
        .then(data => {
          const [resp] = data;
          this.send([resp]);
        })
        .catch(error => console.error(error));
    });
  }
}

export { RequestNode };
