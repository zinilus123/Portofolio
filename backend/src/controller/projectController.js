const projectModel = require('../models/projectModel');

//
// Mengambil semua prject (GET ALL)
//
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.getAllProjects();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data proyek.',
            total: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error getAllProjects:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

//
// mengambil 1 proyek berasarkan id (GET BY ID)
//
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectModel.getProjectById;

        if (!project) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Berhasil mengambil data proyek.`,
            data: project
        });
    } catch (error) {
        console.error(`Error getProjectById:`, error.message);
        res.status(500).json({
            success: false,
            message: `Terjadi kesalahan pada server`,
            error: error.message
        });
    }
};

//
// menambahkan proyek baru (CREATE / POST)
//
const createProject = async (req, res) => {
    try {
        const data = req.body;

        //Validasi: pastikan title tidak kosong
        if (!data.title) {
            return res.status(400).json({
                success: false,
                message: `Kolom "title" wajib diisi!`
            });
        }

        const result = await projectModel.createProject(data);

        res.status(200).json({
            success: true,
            message: `Proyek berhasil ditambahkan!`,
            data: { id: result.insertId }
        });
    } catch (error) {
        console.error(`Error creatProject:`, error.message);
        res.status(500).json({
            success: false,
            message: `Terjadi kesalahan pada server`,
            error: error.message
        });
    }
};

//
// memperbarui data proyek (UPDATE / PUT)
//
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validasi: pastikan title tidak kosong
        if (!data.title) {
            res.status(400).json({
                success: false,
                message: `Kolom "title" wajib diisi!`
            });
        }

        const result = await projectModel.updateProject(id, data)

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Data proyek berhasil diperbarui`
        });
    } catch (error) {
        console.error(`Error updateProject:`, error.message);
        res.status(500).json({
            success: false,
            message: `Terjadi kesalahan pada server`,
            error: error.message
        });
    }
};

//
// Menghapus proyek
//
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await projectModel.deleteProject(id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Proyek berhasil dihapus.`
            });
        }

        res.status(200).json({
            success: true,
            message: `Proyek berhasil dihapus.`
        });
    } catch (error) {
        console.error(`Error deleteProject:`, error.message);
        res.status(500).json({
            success: false,
            message: `Terjadi kesalahan pada server`,
            error: error.message
        });
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};