'use client';

import { useState, useEffect } from 'react';

import { UserResponse } from '@repo/api/ceo';
import { Input, Card, Dialog, Button } from '@repo/design-system/components/ceo';

import { useSearchUsers } from '@/hooks/user/useSearchUsers';

interface UserSearchInputProps {
  selectedUser: UserResponse | null;
  onSelectUser: (user: UserResponse | null) => void;
}

export const UserSearchInput = ({ selectedUser, onSelectUser }: UserSearchInputProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  // Debounce 검색어
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  // 고객 검색
  const { data: searchResult, isLoading } = useSearchUsers(debouncedKeyword);

  // 디버깅용 로그
  console.log('searchResult:', searchResult);
  console.log('isLoading:', isLoading);
  console.log('debouncedKeyword:', debouncedKeyword);

  const handleSelectUser = (user: UserResponse) => {
    onSelectUser(user);
    setKeyword('');
    setIsDialogOpen(false);
  };

  const handleRemoveUser = () => {
    onSelectUser(null);
  };

  return (
    <div className='space-y-4'>
      {/* 선택된 고객 표시 또는 검색 버튼 */}
      {selectedUser ? (
        <Card>
          <div className='flex justify-between items-center p-4'>
            <div>
              <div className='font-medium text-gray-900'>{selectedUser.nickname}</div>
              <div className='text-sm text-gray-500'>{selectedUser.email}</div>
            </div>
            <button
              onClick={handleRemoveUser}
              className='text-red-500 hover:text-red-700 text-sm font-medium'
            >
              제거
            </button>
          </div>
        </Card>
      ) : (
        <Input
          id='user-search-trigger'
          value=''
          placeholder='고객을 검색하세요'
          onClick={() => setIsDialogOpen(true)}
          readOnly
        />
      )}

      {/* 고객 검색 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>고객 검색</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <div className='space-y-4'>
              <Input
                id='user-search'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='고객 이름 또는 전화번호로 검색하세요'
                autoFocus
              />

              {/* 검색 결과 */}
              <div className='max-h-96 overflow-y-auto'>
                {keyword.length < 2 ? (
                  <div className='p-4 text-center text-gray-500'>
                    2글자 이상 입력해주세요.
                  </div>
                ) : isLoading ? (
                  <div className='p-4 text-center text-gray-500'>검색 중...</div>
                ) : searchResult?.data && searchResult.data.list.length > 0 ? (
                  <ul className='divide-y divide-gray-200'>
                    {searchResult.data.list.map((user) => (
                      <li
                        key={user.id}
                        className='p-3 hover:bg-gray-50 cursor-pointer transition-colors'
                        onClick={() => handleSelectUser(user)}
                      >
                        <div className='flex justify-between items-center'>
                          <div>
                            <div className='font-medium text-gray-900'>{user.nickname}</div>
                            <div className='text-sm text-gray-500'>{user.email}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className='p-4 text-center text-gray-500'>검색 결과가 없습니다.</div>
                )}
              </div>
            </div>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant='outlined' onClick={() => setIsDialogOpen(false)}>
              닫기
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

export default UserSearchInput;
