import React from 'react'
import Input from './Input';
import Button from './Button';

const CreateProject = () => {
    const handleCreate = (e) => {
     e.preventDefault();
    }
  return (
    <div className="h-screen w-full bg-gray-700/10 fixed top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handleCreate}
        className="max-w-md max-auto p-6 bg-sky-500 shadow space-y-4 rounded-xl w-full"
      >
        <h2 className="mb-6 text-2xl font-semibold text-center">
          Create a new project
        </h2>
        <Input
          label="project title"
          type="text"
          placeholder="project title here"
       
        />
        <Input
          label="project description"
          type="text"
          placeholder="project description here"
         
        />

        <Button
          type="submit" fullWidth>
        Create project
        </Button>
      </form>
    </div>
  )
}

export default CreateProject;
