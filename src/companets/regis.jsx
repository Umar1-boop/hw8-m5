import { useState } from "react";
import { useForm } from "react-hook-form";
import "./Regis.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const defaultValues = {
  firstName: "",
  email: "",
  track: "",
  experience: "",
  agree: false,
};

export default function EventRegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsSuccess(true);
    reset(defaultValues);
  };

  return (
    <div className="erf">
      <h2 className="erf__title">Запись на бесплатный IT-воркшоп</h2>

      <form className="erf__form" onSubmit={handleSubmit(onSubmit)} noValidate>
  
        <div className="erf__field">
          <label htmlFor="firstName">Имя</label>
          <input
            id="firstName"
            type="text"
            placeholder="Ваше имя"
            {...register("firstName", {
              required: "Введите ваше имя",
              minLength: {
                value: 2,
                message: "Имя должно содержать минимум 2 символа",
              },
            })}
          />
          {errors.firstName && (
            <p className="erf__error">{errors.firstName.message}</p>
          )}
        </div>

    
        <div className="erf__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: EMAIL_REGEX,
                message: "Некорректный формат email",
              },
            })}
          />
          {errors.email && <p className="erf__error">{errors.email.message}</p>}
        </div>

      
        <div className="erf__field">
          <label htmlFor="track">Направление</label>
          <select
            id="track"
            {...register("track", { required: "Выберите направление" })}
          >
            <option value="">Выберите направление</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">Design</option>
          </select>
          {errors.track && <p className="erf__error">{errors.track.message}</p>}
        </div>

       
        <fieldset className="erf__field erf__fieldset">
          <legend>Уровень опыта</legend>
          <div className="erf__radios">
            {[
              { value: "junior", label: "Junior" },
              { value: "middle", label: "Middle" },
              { value: "senior", label: "Senior" },
            ].map(({ value, label }) => (
              <label key={value} className="erf__inline">
                <input
                  type="radio"
                  value={value}
                  {...register("experience", {
                    required: "Укажите ваш уровень",
                  })}
                />
                {label}
              </label>
            ))}
          </div>
          {errors.experience && (
            <p className="erf__error">{errors.experience.message}</p>
          )}
        </fieldset>

        <div className="erf__field">
          <label className="erf__inline">
            <input
              type="checkbox"
              {...register("agree", {
                required: "Необходимо согласие на обработку данных",
              })}
            />
            Я согласен(на) с правилами и обработкой данных
          </label>
          {errors.agree && <p className="erf__error">{errors.agree.message}</p>}
        </div>

        <button type="submit" className="erf__button">
          Записаться
        </button>
      </form>

      {isSuccess && (
        <div className="erf__success" role="status">
          Вы успешно зарегистрированы!
        </div>
      )}
    </div>
  );
}
