// const express = require('express');
// const router = express.Router();
// const Task = require('../models/Task');
// const { deleteOne } = require('../models/BlogPost');
// const multer = require('multer');
// const path = require('path');

// const auth = require('../middleware/auth');

// router.post('/addTask', async (req, res) => {
//     try {
//         const { title, desc, status, image } = req.body;

//         const checkTask = await Task.findOne({ title });
//         if (checkTask) {
//             return res.status(409).json({ message: 'Task already exists with the title' });
//         }

//         const newTask = new Task({
//             title,
//             description:desc,   
//             status
//         });
//         const savedTask = await newTask.save();

//         res.status(201).json(savedTask);
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error creating task.' });
//     }
// });

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
  
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // 1MB limit
//     fileFilter: (req, file, cb) => {
//       checkFileType(file, cb);
//     }
// }).single('taskImage');
  
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|pdf/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
  
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb('Error: Images Only!');
//     }
// }

// router.post('/addTask', (req, res) => {
//     upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err });
//       } else {
//         if (req.file == undefined) {
//           return res.status(400).json({ message: 'No file selected' });
//         } else {
//           try {
//             const { title, desc, status } = req.body;
  
//             const checkTask = await Task.findOne({ title });
//             if (checkTask) {
//               return res.status(409).json({ message: 'Task already exists with the title' });
//             }
  
//             const newTask = new Task({
//               title,
//               description: desc,
//               status,
//               imagePath: req.file.path.replace(/\\/g, '/')
//             });
  
//             const savedTask = await newTask.save();
//             res.status(201).json(savedTask);
//           } catch (err) {
//             console.error(err);
//             return res.status(500).json({ message: 'Error creating task.' });
//           }
//         }
//       }
//     });
// });
  
// router.get('/:id', async (req, res) => {
//     try{
//         const existingTask = await Task.findById(req.params.id);
//         if(!existingTask)   {
//             return res.status(404).json({ message: 'task not found'});
//         }
 
//         res.json(existingTask);
//     }catch(err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error creating task.' });
//     }
// });

// router.put('/updateTask/:id', async (req, res) => {
//     try{
//         const {title, desc, status} = req.body;
//         const existingTask = await Task.findById(req.params.id);
//         if(!existingTask)   {
//             return res.status(404).json({ message: 'task not found'});
//         }

//         existingTask.title = title;
//         existingTask.description = desc;
//         existingTask.status = status;
//         const updatedTask = await existingTask.save();

//         res.json(updatedTask);
//     }catch(err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error creating task.' });
//     }
// });

// router.delete('/deleteTask/:id', async (req, res) => {
//     try{
//         const existingTask = await Task.findById(req.params.id);
        
//         if(!existingTask)    {
//             return res.status(404).json({ message: 'task not found'});
//         }

//         await deleteOne({ _id: req.params.id});
//         res.json({ message: 'deleted successfully'});
//     } catch(err)    {
//         console.error(err);
//         return res.status(500).json({ message: 'Error creating task.' });
//     } 
// })

// module.exports = router;


