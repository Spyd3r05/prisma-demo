import { createPost } from "../lib/actions";

export default function CreatePage() {
  return (
    <form
      action={createPost}
      className="flex flex-col gap-4 max-w-[500px] mx-auto mt-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        className="border border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 cursor-pointer text-white p-2 rounded-md"
      >
        Create
      </button>
    </form>
  );
}
