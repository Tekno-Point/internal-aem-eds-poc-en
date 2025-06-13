export default function decorate(block) {
    console.log(block)
    const rows = Array.from(block.children);
    console.log(rows)

    const swiperWrapper = document.createElement('div');
    const swiperPagination = document.createElement('div');
    const swiperButtonPrev = document.createElement('div');
    const swiperWrapper = document.createElement('div');
}