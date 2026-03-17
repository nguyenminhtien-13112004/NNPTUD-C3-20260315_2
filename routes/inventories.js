var express = require('express');
var router = express.Router();
let inventoryModel = require('../schemas/inventories');
let productModel = require('../schemas/products');

// Lấy tất cả inventory (có join product)
router.get('/', async function (req, res, next) {
  try {
    let result = await inventoryModel.find().populate({
      path: 'product',
      select: 'title price category'
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// Lấy inventory theo ID (có join product)
router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await inventoryModel.findById(id).populate({
      path: 'product',
      select: 'title price category'
    });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "INVENTORY ID NOT FOUND" });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Helper: lấy inventory theo product id, nếu chưa có thì tạo mới
async function getOrCreateInventoryByProduct(productId) {
  let product = await productModel.findOne({
    _id: productId,
    isDeleted: false
  });
  if (!product) {
    return null;
  }
  let inv = await inventoryModel.findOne({ product: productId });
  if (!inv) {
    inv = await inventoryModel.create({
      product: productId,
      stock: 0,
      reserved: 0,
      soldCount: 0
    });
  }
  return inv;
}

// Add_stock: tăng stock theo quantity
router.post('/add_stock', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    quantity = Number(quantity || 0);
    if (!product || quantity <= 0) {
      res.status(400).send({ message: "product va quantity > 0 la bat buoc" });
      return;
    }
    let inv = await getOrCreateInventoryByProduct(product);
    if (!inv) {
      res.status(404).send({ message: "PRODUCT NOT FOUND" });
      return;
    }
    inv.stock += quantity;
    await inv.save();
    res.send(inv);
  } catch (error) {
    next(error);
  }
});

// Remove_stock: giam stock theo quantity
router.post('/remove_stock', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    quantity = Number(quantity || 0);
    if (!product || quantity <= 0) {
      res.status(400).send({ message: "product va quantity > 0 la bat buoc" });
      return;
    }
    let inv = await getOrCreateInventoryByProduct(product);
    if (!inv) {
      res.status(404).send({ message: "PRODUCT NOT FOUND" });
      return;
    }
    if (inv.stock < quantity) {
      res.status(400).send({ message: "stock khong du" });
      return;
    }
    inv.stock -= quantity;
    await inv.save();
    res.send(inv);
  } catch (error) {
    next(error);
  }
});

// reservation: giam stock, tang reserved
router.post('/reservation', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    quantity = Number(quantity || 0);
    if (!product || quantity <= 0) {
      res.status(400).send({ message: "product va quantity > 0 la bat buoc" });
      return;
    }
    let inv = await getOrCreateInventoryByProduct(product);
    if (!inv) {
      res.status(404).send({ message: "PRODUCT NOT FOUND" });
      return;
    }
    if (inv.stock < quantity) {
      res.status(400).send({ message: "stock khong du de reservation" });
      return;
    }
    inv.stock -= quantity;
    inv.reserved += quantity;
    await inv.save();
    res.send(inv);
  } catch (error) {
    next(error);
  }
});

// sold: giam reserved, tang soldCount
router.post('/sold', async function (req, res, next) {
  try {
    let { product, quantity } = req.body;
    quantity = Number(quantity || 0);
    if (!product || quantity <= 0) {
      res.status(400).send({ message: "product va quantity > 0 la bat buoc" });
      return;
    }
    let inv = await getOrCreateInventoryByProduct(product);
    if (!inv) {
      res.status(404).send({ message: "PRODUCT NOT FOUND" });
      return;
    }
    if (inv.reserved < quantity) {
      res.status(400).send({ message: "reserved khong du de sold" });
      return;
    }
    inv.reserved -= quantity;
    inv.soldCount += quantity;
    await inv.save();
    res.send(inv);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

