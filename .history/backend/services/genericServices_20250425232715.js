class GenericService {
  constructor(model) {
    this.model = model;
  }

  async getAll(req, res) {
    try {
      const { page = 1, limit } = req.query;
      const pageNum = parseInt(page, 10);
      const limitNum = limit ? parseInt(limit) : null;
      const skip = (pageNum - 1) * limitNum;

      const [data, total] = await Promise.all([
        this.model.find().skip(skip).limit(limitNum),
        this.model.countDocuments(),
      ]);

      const totalPages = Math.ceil(total / limitNum);

      res.status(200).json({
        success: true,
        data,
        total,
        page: pageNum,
        totalPages,
      });
    } catch (error) {
      console.error("Erreur dans GenericService.getAll :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await this.model.findById(id);
      if (!data) {
        return res.status(404).json({ error: "Ressource non trouvée" });
      }
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Erreur dans GenericService.getById :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }

  async create(req, res, next) {
    try {
      const data = await this.model.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      console.error("Erreur dans GenericService.create :", error);
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({ error: "Ressource non trouvée" });
      }
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Erreur dans GenericService.update :", error);
      next(error);
    }
  }

  async patch(req, res, next) {
    try {
      const { id } = req.params;
      const data = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json({ error: "Ressource non trouvée" });
      }
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Erreur dans GenericService.patch :", error);
      next(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const data = await this.model.findByIdAndDelete(id);
      if (!data) {
        return res.status(404).json({ error: "Ressource non trouvée" });
      }
      res
        .status(200)
        .json({ success: true, message: "Ressource supprimée avec succès" });
    } catch (error) {
      console.error("Erreur dans GenericService.delete :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  }
}

module.exports = GenericService;
