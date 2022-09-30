import { formatRuble } from "../helpers/helpers";
import { TopPageModel } from "../interfaces/pageInterface";
import Star from './imgs/small_star.svg';


export default function Card ({page}: {page: TopPageModel}) {
    
    return (
        <div className="TopPageComponent_vacancy">
                <div className="TopPageComponent_vacancy_title">
                    <h2>Вакансии - {page.category}</h2>
                    <div className="tag_medium red">hh.ru</div>
                </div>
                
                <div className="TopPageComponent_vacancy_data">
                    <div className="TopPageComponent_vacancy_data_total">
                        <div>
                            <p>Всего вакансий</p>
                            <h1>{page.hh.count}</h1>
                        </div>
                    </div>

                    <div className="TopPageComponent_vacancy_data_sallary">
                        <div className="TopPageComponent_vacancy_data_sallary_jun">
                            <p>Начальный</p>
                            <h1>{formatRuble(page.hh.juniorSalary)}</h1>
                            <Star/><Star/><Star/>
                        </div >
                        <div className="splitter"/>
                        <div className="TopPageComponent_vacancy_data_sallary_mid">
                            <p>Средний</p>
                            <h1>{formatRuble(page.hh.middleSalary)}</h1>
                            <Star/><Star/><Star/>
                        </div>
                        <div className="splitter"/>
                        <div className="TopPageComponent_vacancy_data_sallary_sin">
                            <p>Профессионал</p>
                            <h1>{formatRuble(page.hh.seniorSalary)}</h1>
                            <Star/><Star/><Star/>
                        </div>
                    </div>
                </div>
            </div>
    );
}