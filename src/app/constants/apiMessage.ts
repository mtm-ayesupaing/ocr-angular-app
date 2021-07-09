import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiMessage {
  public APPLICATION_RESULT = {
    // APPROVED: '承認されました。',
    // CONFIRMED: '確認されました。',
    // LOCK: 'ニュースをロックしました。',
    // UN_LOCK: 'ロックを解除しました。',
    // ROLLBACK: 'ロールバックされました。',
    // UPDATE_ARTICLE: '選択したニュースがアーカイブされました。',
    // ADD_KLUSTER: 'クラスターが追加されました。',
    // ADD_COKLUSTER: '子クラスターが追加されました。',
    // UPDATE_KLUSTER: 'クラスターが保存されました。',
    // UPDATE_COKLUSTER: '子クラスターが保存されました。',
    // HARD_DELETE_KLUSTER: 'クラスターが物理削除されました。',
    // SOFT_DELETE_KLUSTER: 'クラスターが論理削除されました。',    
    // SOFT_DELETE_COKLUSTER: '子クラスターが論理削除されました。',
    // RELOAD_ALERT: '新しいニュースがあります。',
    CREATE_RESTAURANT: 'レストランが作成されました。',
    UPDATE_RESTAURANT: 'レストラン名が更新されました。',
    HARD_DELETE_RESTAURANT: 'レストランが物理削除されました。',
    CREATE_USER: 'Saved Successfully.',
    UPDATE_USER: 'Updated Successfully.',
    DELETE_USER: 'Deleted Successfully.',
  };

  public APPLICATION_CONFIRM = {
    // ROLLBACK: 'ロールバックしますがよろしいでしょうか?',
    DELETE: '削除しますがよろしいでしょうか?',
    // DELETE_COKLUSTER_FIELDS: '行目を削除しますがよろしいでしょうか?'
  };

  public ERROR = {
    COMMON_ERROR: 'エラーが発生しました。',
  };
}
