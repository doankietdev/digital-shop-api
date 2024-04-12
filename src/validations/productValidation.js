import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import asyncHandler from '~/utils/asyncHandler'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(10).required(),
    brand: Joi.string().min(2).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const getProduct = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required()
  })

  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const updateProduct = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    title: Joi.string().min(2),
    description: Joi.string().min(10),
    brand: Joi.string().min(2),
    price: Joi.number().min(0),
    category: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
  })

  try {
    await correctCondition.validateAsync(
      { ...req.params, ...req.body },
      { abortEarly: false }
    )
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const deleteProduct = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required()
  })

  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const rating = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    star: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(1)
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const addVariant = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    name: Joi.string().min(2),
    images: Joi.array(),
    quantity: Joi.number().min(0)
  })
  try {
    await correctCondition.validateAsync(
      { ...req.files.images, ...req.body, ...req.params },
      {
        abortEarly: false
      }
    )
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const editVariant = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    variantId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    name: Joi.string().min(2),
    images: Joi.array(),
    quantity: Joi.number().min(0),
    deletedImageIds: Joi.array().items(Joi.string())
  })
  try {
    await correctCondition.validateAsync(
      {
        ...req.body,
        ...req.params,
        ...req.query,
        images: req.files
      },
      {
        abortEarly: false
      }
    )
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

const deleteVariant = asyncHandler(async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required(),
    variantId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE)
      .required()
  })
  try {
    await correctCondition.validateAsync(
      {
        ...req.params,
        ...req.query
      },
      {
        abortEarly: false
      }
    )
    next()
  } catch (error) {
    throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message)
  }
})

export default {
  createNew,
  getProduct,
  updateProduct,
  deleteProduct,
  rating,
  addVariant,
  editVariant,
  deleteVariant
}
