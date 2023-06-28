import Lamarans from "../models/LamaranModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getLamarans = async (req, res) => {
    try {
        let response;
        if (req.role === "admin") {
            response = await Lamarans.findAll({
                attributes: ['uuid', 'name', 'posisi', 'deskripsi', 'pengalaman'],
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name'],
                }]
            });
        } else {
            response = await Lamarans.findAll({
                attributes: ['uuid', 'name', 'posisi', 'deskripsi', 'pengalaman'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


export const getLamaranById = async (req, res) => {
    try {
        const lamaran = await Lamarans.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lamaran) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "admin") {
            response = await Lamarans.findOne({
                attributes: ['uuid', 'name', 'posisi', 'deskripsi', 'pengalaman'],
                where: {
                    id: lamaran.id
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name'],
                }]
            });
        } else {
            response = await Lamarans.findOne({
                attributes: ['uuid', 'name', 'posisi', 'deskripsi', 'pengalaman'],
                where: {
                    [Op.and]: [{ id: lamaran.id }, { userId: req.userId }]
                },
                include: [{
                    model: Users,
                    attributes: ['uuid', 'name'],
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createLamaran = async (req, res) => {
    const { name, posisi, deskripsi, pengalaman } = req.body;
    try {
        await Lamarans.create({
            name: name,

            posisi: posisi,
            deskripsi: deskripsi,
            pengalaman: pengalaman,
            userId: req.userId
        });
        res.status(201).json({ msg: "Lamaran Created Successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updateLamaran = async (req, res) => {
    try {
        const lamaran = await Lamarans.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lamaran) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, posisi, deskripsi, pengalaman } = req.body;
        if (req.role === "admin") {
            await Lamarans.update({ name, posisi, deskripsi, pengalaman }, {
                where: {
                    id: lamaran.id
                }
            });
        } else {
            if (req.userId !== lamaran.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Lamarans.update({ name, posisi, deskripsi, pengalaman }, {
                where: {
                    [Op.and]: [{ id: lamaran.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Lamaran updated successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}



export const deleteLamaran = async (req, res) => {
    try {
        const lamaran = await Lamarans.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!lamaran) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, posisi, deskripsi, pengalaman } = req.body;
        if (req.role === "admin") {
            await Lamarans.destroy({
                where: {
                    id: lamaran.id
                }
            });
        } else {
            if (req.userId !== lamaran.userId) return res.status(403).json({ msg: "Akses terlarang" });
            await Lamarans.destroy({
                where: {
                    [Op.and]: [{ id: lamaran.id }, { userId: req.userId }]
                }
            });
        }
        res.status(200).json({ msg: "Lamaran deleted successfuly" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}