import { Color } from '@/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createColor, updateColor } from '../editor/[id]/(data-access)/color'

export const ColorEditor = ({ closeEditor }: { closeEditor: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Color>()
  const onSubmit: SubmitHandler<Color> = async (data) => {
    try {
      if (data.id) {
        const updatedColor = updateColor(data.id, data.name)
        console.log('Color updated:', updatedColor)
      } else {
        const createdColor = await createColor(data.name)
        console.log('Color created:', createdColor)
      }
      closeEditor()
    } catch (error) {
      console.error('Error creating or updating color:', error)
    }
  }
  return (
    <div className="container mx-auto max-w-3xl rounded-md bg-white/75 p-4 backdrop-blur-lg">
      <h3 className="mb-2 text-2xl font-semibold">новый цвет.</h3>
      <hr className="mb-4 border" style={{ borderColor: '#F35627' }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4 flex items-center">
          <label className="w-1/4">Имя</label>
          <input
            className="form-input w-3/4 rounded border-gray-300"
            {...register('name', { required: 'Обязательное поле!' })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="flex justify-end">
          <button className="p-2 px-4 hover:underline" type="button" onClick={closeEditor}>
            Закрыть
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            type="submit"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  )
}
