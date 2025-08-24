import { Folder, File } from "./file-system-composite";


let folder1 = new Folder("Folder 1");
let folder2 = new Folder("Folder 2");
let folder3 = new Folder("Folder 3");
let file1 = new File("File 1", "File 1 text");
let file2 = new File("File 2", "File 2 text");
let file3 = new File("File 3", "File 3 text");

folder1.addFile(file1);
folder1.addFolder(folder2);
folder2.addFile(file2);
folder2.addFile(file3);
folder2.addFolder(folder3);
folder3.addFile(new File("File 4", "File 4 text"));
folder3.addFile(new File("File 5", "File 5 text"));

folder1.display();
