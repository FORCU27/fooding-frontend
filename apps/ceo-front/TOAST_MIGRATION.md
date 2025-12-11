# Toast Migration Checklist

`/my/` 폴더 내 모든 API 호출(mutation)에 대한 toast 적용 현황

## Status Legend
- [x] 완료
- [ ] 미완료

---

## 1. devices/[id]/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| changeServiceMutation | [x] | [x] | 서비스 변경 시 |
| disconnectMutation | [x] | [x] | 연결 해제 시 |

---

## 2. store/photo/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| uploadFile + createImage | [x] | [x] | 이미지 업로드 |
| deleteImage | [x] | [x] | 이미지 삭제 |
| editImage | [x] | [x] | 태그 수정 |
| registerMainImage | [x] | [x] | 대표 이미지 설정 |

---

## 3. store/menus/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| createCategoryMutation | [x] | [x] | 카테고리 등록 |
| sortCategoriesMutation | - | [x] | 카테고리 순서 변경 (드래그 중이라 성공 toast 불필요) |
| updateCategoryMutation | [x] | [x] | 카테고리 수정 |
| deleteCategoryMutation | [x] | [x] | 카테고리 삭제 |
| deleteMenuMutation | [x] | [x] | 메뉴 삭제 |

---

## 4. store/menus/AddMenuDialog.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| createMenu | [x] | [x] | 메뉴 추가 |
| updateMenu | [x] | [x] | 메뉴 수정 |

---

## 5. store/menus/MenuBoardImageUpload.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| uploadFile + createMenuBoard | [x] | [x] | 메뉴판 이미지 업로드 |
| deleteMenuBoard | [x] | [x] | 메뉴판 이미지 삭제 |

---

## 6. store/basic/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| putStoreMutation | [x] | [x] | 기본 정보 저장 |

---

## 7. store/additional/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| updateInformationMutation | [x] | [x] | 부가 정보 저장 |

---

## 8. regular/news/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| toggleVisibility | [x] | [x] | 공개 여부 변경 |
| deleteNews | [x] | [x] | 뉴스 삭제 |

---

## 9. regular/news/create/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| createNews (hook 내부) | [x] | [x] | 뉴스 생성 - hook에서 처리 |

---

## 10. regular/news/[id]/edit/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| updateNews (hook 내부) | [x] | [x] | 뉴스 수정 - hook에서 처리 |

---

## 11. regular/favorite/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| deleteRegular | [x] | [x] | 단골 삭제 |
| toggleFavorite | [x] | [x] | 즐겨찾기 변경 |

---

## 12. reward/coupon/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| deleteCouponMutation | [x] | [x] | 쿠폰 삭제 |

---

## 13. reward/coupon/create/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| createCoupon (hook 내부) | [x] | [x] | 쿠폰 생성 - hook에서 처리 |

---

## 14. reward/coupon/edit/[id]/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| updateCoupon | [x] | [x] | 쿠폰 수정 |

---

## 15. reward/coupon/gift/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| giftCoupon (hook 내부) | [x] | [x] | 쿠폰 선물 - hook에서 처리 |

---

## 16. reward/pointshop/create/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| uploadFile + createStorePointShopItem | [x] | [x] | 포인트샵 상품 등록 |

---

## 17. reward/pointshop/[id]/modify/page.tsx

| Mutation | Success Toast | Error Toast | 비고 |
|----------|--------------|-------------|------|
| uploadFile + updateStorePointShopItem | [x] | [x] | 포인트샵 상품 수정 |

---

## Migration Complete!

모든 API 호출에 대한 toast 적용이 완료되었습니다. (2024-11-26)

### 수정된 파일 목록
1. `devices/[id]/page.tsx` - changeServiceMutation, disconnectMutation에 toast 추가
2. `store/photo/page.tsx` - deleteImage, editImage, registerMainImage에 toast 추가
3. `store/menus/page.tsx` - deleteMenuMutation success toast, sortCategoriesMutation error toast 추가
4. `regular/news/page.tsx` - toggleVisibility success toast 추가
5. `regular/favorite/page.tsx` - toggleFavorite success toast 추가
