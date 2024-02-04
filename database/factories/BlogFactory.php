<?php

namespace Database\Factories;

use App\Services\SeedImagesService;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Mongodb\Blog;
use App\Models\Mongodb\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BlogFactory extends Factory
{
    protected $model = Blog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $randImages = SeedImagesService::getRandImages();
        
        return [
            'authorId' => User::factory(),
            'title' => $this->faker->sentence(rand(5, 10)),
            'description' => $this->faker->paragraph(rand(5, 20)),
            'content' => $this->getStaticContent(),
            'isPublic' => true,
            'image' => array_shift($randImages),
        ];
    }

    private function getStaticContent()
    {
        return '
            <h2>Предсказания 1993 года</h2><p>Для первого выпуска EDGE редакции удалось взять комментарий у&nbsp;писателя Артура Кларка (Arthur&nbsp;C. Clarke), автора книги <strong>«2001: Космическая одиссея»</strong>. Он&nbsp;был немногословен и&nbsp;лишь выразил обеспокоенность по&nbsp;поводу набирающей популярность виртуальной реальности: <i>«Если можно подключиться к&nbsp;другой вселенной, то&nbsp;зачем от&nbsp;неё отключаться?»</i> На&nbsp;сегодняшний день человечество не&nbsp;дошло до&nbsp;той стадии, на&nbsp;которой люди забрасывали&nbsp;бы реальный мир в&nbsp;угоду цифровому, но&nbsp;зависимость от&nbsp;видеоигр привлекла внимание специалистов&nbsp;— ВОЗ, к&nbsp;примеру, уже <a href="https://stopgame.ru/newsdata/34431/simptomy_videoigrovoy_zavisimosti">внесла</a> её&nbsp;в&nbsp;перечень болезней и&nbsp;расстройств.</p><p>Другим собеседником EDGE был певец Питер Гэбриел (Peter Gabriel), работавший в&nbsp;тот момент над игрой <strong>XPLORA1: Peter Gabriel’s Secret World</strong>. Это было своего рода промо к&nbsp;новому альбому музыканта, позволявшее смотреть видеозаписи со&nbsp;студии, а&nbsp;также создавать миксы песен. Исполнитель ожидал, что существование CD-ROM полностью изменит развлекательную сферу, а&nbsp;со&nbsp;временем «появится технология, позволяющая каждому покупателю становиться уникальной творческой единицей». В&nbsp;каком-то смысле так и&nbsp;получилось&nbsp;— многие современные игры предлагают редакторы карт и&nbsp;целых миров.</p><p>Бывший вице-президент <strong>Electronic Arts</strong> Марк Льюис (Mark Lewis) предсказывал, что в&nbsp;какой-то момент игры станут настолько интерактивными, что люди смогут пойти в&nbsp;кинотеатр и&nbsp;«поиграть в&nbsp;фильм». Частично предсказание сбылось&nbsp;— у&nbsp;нас есть и&nbsp;трёхмерное «кинцо» от&nbsp;<strong>Quantic Dream</strong> и&nbsp;<strong>Telltale Games</strong>, и&nbsp;настоящие интерактивные фильмы:&nbsp;<a href="https://stopgame.ru/game/her_story"> Her Story</a>,&nbsp;<a href="https://stopgame.ru/game/immortality"> IMMORTALITY</a> и&nbsp;так далее. Правда, в&nbsp;кинотеатрах в&nbsp;них не&nbsp;играют.</p><p>А&nbsp;вот управляющий директор <strong>Sega Europe</strong> Ник Александер (Nick Alexander) оказался самым большим фантазёром&nbsp;— он&nbsp;считал, что скоро появятся игры, в&nbsp;которых «управлять можно будет силой мысли».</p><h2>Предсказания 2013 года</h2><p>Когда у&nbsp;разработчиков брали комментарии, все в&nbsp;индустрии обсуждали шлемы виртуальной реальности&nbsp;— в&nbsp;тот момент началась рассылка девкитов Oculus Rift. К&nbsp;примеру, Тьяго Соуза (Tiago Sousa), тогдашний ведущий графический инженер <strong>Crytek</strong>, возлагал на&nbsp;технологию большие надежды:</p>
        ';
    }
}
